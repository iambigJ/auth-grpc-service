import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import {
  TokenClaim,
  SendVerificationRequest,
  SendVerificationResponse,
  VerifyValidationCodeResponse,
  RefreshTokenResponse,
  Tokens,
  LogoutResponse,
} from './auth.interface';
import { AuthContext } from './strategy/auth.strategy';
import { REDIS_CLIENT, RedisClient } from '../common/redis/redis.types';
import { UtilsService } from '../common/providers/utils/utils.service';
import { AuthMobileStrategy } from './strategy/auth.mobile.strategy';
import { AuthEmailStrategy } from './strategy/auth.email.strategy';
import { LoginDto, SignupDto, VerifyValidationCodeDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { AuthMapper } from './mapper/auth.mapper';
import { RpcException } from '@nestjs/microservices';
import { Users } from '../users/users.entity';
import { PlansService } from '../plans/plans.service';
import { RPC_BAD_REQUEST } from '../common/messages';

@Injectable()
export class AuthService {
  private readonly redisAuthExpire: number;
  private readonly redisRefreshExpire: number;
  constructor(
    private readonly authContext: AuthContext,
    private readonly authMobileStrategy: AuthMobileStrategy,
    private readonly authEmailStrategy: AuthEmailStrategy,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly planService: PlansService,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {
    this.redisAuthExpire = this.configService.get<number>(
      'REDIS_JWT_EXPIRE_TIME',
    );
  }
  async sendVerification(
    sendVerificationRequest: SendVerificationRequest,
  ): Promise<Observable<SendVerificationResponse>> {
    if (sendVerificationRequest.strategy === 'email') {
      this.authContext.setStrategy(this.authEmailStrategy);
    } else {
      this.authContext.setStrategy(this.authMobileStrategy);
    }
    const { code, message } = UtilsService.generateSmsValidationCode();
    await this.redisClient.set(
      sendVerificationRequest.verifier,
      JSON.stringify({
        code: code,
        isValid: false,
      }),
      'EX',
      this.redisAuthExpire,
    );
    await this.authContext.sendVerification(
      sendVerificationRequest.verifier,
      message,
    );
    return of({
      message,
    });
  }

  async verifyValidationCode(
    verifyValidationCodeRequest: VerifyValidationCodeDto,
  ): Promise<Observable<VerifyValidationCodeResponse>> {
    try {
      const { code, verifier } = verifyValidationCodeRequest;
      const savedCode = await this.redisClient.get(verifier);
      if (!savedCode) {
        return of({
          message: 'Verification failed!',
        });
      }
      const toObjectCode = JSON.parse(savedCode) as FromRedis;
      if (String(toObjectCode.code) !== code) {
        return of({
          message: 'Code is Wrong!',
        });
      }
      await this.redisClient.set(
        verifier,
        JSON.stringify({
          code: code,
          isValid: true,
        }),
        'EX',
        this.redisAuthExpire,
      );
      return of({
        message: 'Ok',
      });
    } catch (e) {
      console.log({ e });
    }
  }

  async signup(singUpDto: SignupDto): Promise<Observable<any>> {
    const verifier = singUpDto.mobile || singUpDto.email;
    const verification = await this.redisClient.get(verifier);
    if (!verification) {
      throw new RpcException({
        code: 3,
        message: 'mobile or email not verified!',
      });
    }
    const toObjectCode = JSON.parse(verification) as FromRedis;
    if (!toObjectCode.isValid) {
      throw new RpcException({
        code: 3,
        message: 'mobile or email not verified!',
      });
    }
    await this.redisClient.del(verifier);
    const plan = await this.planService.findByName('default');
    const createUserData = { ...singUpDto, planId: plan.id };
    const createUserDto = AuthMapper.toPersistence(createUserData);
    const user = await this.userService.create(createUserDto);
    const payload = { sub: user.id };
    return of({
      token: await this.jwtService.signAsync(payload),
    });
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByEmailOrMobile(
      loginDto.email,
      loginDto.mobile,
    );
    const isCorrect = await UtilsService.comparePass(
      loginDto.password,
      user.password,
    );
    if (!isCorrect) {
      throw new RpcException({
        code: 3,
        message: 'email/mobile or password is incorrect',
      });
    }
    const { token, refreshToken } = await this.generateTokens(user);
    return of({
      token,
      refreshToken,
    });
  }

  private async generateToken(tokenClaim: TokenClaim): Promise<string> {
    const token = await this.jwtService.signAsync(tokenClaim, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRE_TIME'),
    });
    await this.storeToken(tokenClaim.id, 'token', token);
    return token;
  }

  private async generateRefreshToken(tokenClaim: TokenClaim): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(tokenClaim, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE_TIME'),
    });
    await this.storeToken(tokenClaim.id, 'refresh', refreshToken);
    return refreshToken;
  }
  private async generateTokens(userData: Users): Promise<Tokens> {
    const tokenClaim = this.toClaim(userData);
    const token = await this.generateToken(tokenClaim);
    const refreshToken = await this.generateRefreshToken(tokenClaim);
    return {
      token,
      refreshToken,
    };
  }

  private toClaim(userData: Users): TokenClaim {
    return {
      id: userData.id,
      role: userData.role,
      mobile: userData.mobile,
      email: userData.email,
      payerId: userData.payerId,
      planId: userData.planId,
      walletId: 'walleettt',
      //TODO: add walletId
    };
  }

  async storeToken(userId: string, type: string, token: string): Promise<void> {
    await this.redisClient.set(
      `${userId}-${type}`,
      token,
      'EX',
      this.redisAuthExpire,
    );
  }

  async readToken(userId: string, type: string): Promise<string> {
    return this.redisClient.get(`${userId}-${type}`);
  }

  async removeToken(userId: string, type: string): Promise<void> {
    await this.redisClient.del(`${userId}-${type}`);
  }

  async verifyTokenAsync(token: string, secret: string): Promise<TokenClaim> {
    const decoded = await this.jwtService.verifyAsync(token, { secret });
    const isInBlackList = await this.readToken(decoded.id, 'block_token');
    const isTokenFound = await this.readToken(decoded.id, 'token');
    if (isInBlackList || !isTokenFound) {
      throw new RpcException({
        code: 3,
        message: RPC_BAD_REQUEST,
        data: 'token is invalid',
      });
    }
    return this.toClaim(decoded);
  }

  async verifyToken(token: string): Promise<Observable<TokenClaim>> {
    try {
      const decoded = await this.verifyTokenAsync(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      return of(decoded);
    } catch (e) {
      throw new RpcException({
        code: 3,
        message: RPC_BAD_REQUEST,
        data: e,
      });
    }
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<Observable<RefreshTokenResponse>> {
    try {
      const decoded = await this.verifyTokenAsync(
        refreshToken,
        this.configService.get<string>('JWT_SECRET_REFRESH'),
      );
      const token = await this.generateToken(decoded);
      return of({ token });
    } catch (e) {
      throw new RpcException({
        code: 3,
        message: RPC_BAD_REQUEST,
        data: e,
      });
    }
  }

  async logout(token: string): Promise<Observable<LogoutResponse>> {
    try {
      const decoded = await this.verifyTokenAsync(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      const refresh = await this.readToken(decoded.id, 'refresh');
      await Promise.all([
        this.removeToken(decoded.id, 'token'),
        this.removeToken(decoded.id, 'refresh'),
        this.storeToken(decoded.id, 'block_token', token),
        this.storeToken(decoded.id, 'block_refresh', refresh),
      ]);
      return of({ messages: 'ok' });
    } catch (e) {
      throw new RpcException({
        code: 3,
        message: RPC_BAD_REQUEST,
        data: e,
      });
    }
  }
}

export interface FromRedis {
  code: string;
  isValid: boolean;
}
