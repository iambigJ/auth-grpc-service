import { Body, Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  RefreshTokenResponse,
  SendVerificationResponse,
  TokenClaim,
  VerifyValidationCodeResponse,
} from './auth.interface';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RefreshTokenDto,
  SendVerificationDto,
  SignupDto,
  VerifyTokenDto,
  VerifyValidationCodeDto,
} from './dto/auth.dto';
import { GrpcExceptionFilter } from '../common/rpc.filter';
import { AuthValidator } from './auth.validator';
import { RPC_BAD_REQUEST } from '../common/messages';
import { HashPasswordPipe } from './mapper/auth.transform.pipe';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @GrpcMethod('AuthService', 'SendVerification')
  @UseFilters(GrpcExceptionFilter)
  async sendVerification(
    sendVerificationRequest: SendVerificationDto,
  ): Promise<Observable<SendVerificationResponse>> {
    if (!AuthValidator.isSendVerificationValidate(sendVerificationRequest)) {
      throw new RpcException({
        code: 3,
        message: RPC_BAD_REQUEST,
      });
    }
    return await this.authService.sendVerification(sendVerificationRequest);
  }
  @GrpcMethod('AuthService', 'VerifyValidationCode')
  async verifyValidationCode(
    verifyValidationCodeDto: VerifyValidationCodeDto,
  ): Promise<Observable<VerifyValidationCodeResponse>> {
    return await this.authService.verifyValidationCode(verifyValidationCodeDto);
  }

  @GrpcMethod('AuthService', 'Signup')
  async signup(
    @Body(HashPasswordPipe) signupDto: SignupDto,
  ): Promise<Observable<any>> {
    return await this.authService.signup(signupDto);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(loginDto: LoginDto): Promise<Observable<any>> {
    return await this.authService.login(loginDto);
  }

  @GrpcMethod('AuthService', 'VerifyToken')
  async VerifyToken(
    verifyTokenDto: VerifyTokenDto,
  ): Promise<Observable<TokenClaim>> {
    return await this.authService.verifyToken(verifyTokenDto.token);
  }

  @GrpcMethod('AuthService', 'RefreshToken')
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<Observable<RefreshTokenResponse>> {
    return await this.authService.refreshToken(refreshTokenDto.token);
  }
}
