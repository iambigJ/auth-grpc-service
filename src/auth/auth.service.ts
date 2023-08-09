import { Inject, Injectable } from '@nestjs/common';
import {
  SendVerificationRequest,
  SendVerificationResponse,
  VerifyValidationCodeRequest,
  VerifyValidationCodeResponse,
} from './auth.interface';
import { Observable, of } from 'rxjs';
import { AuthContext } from './strategy/auth.strategy';
import { REDIS_CLIENT, RedisClient } from '../common/redis/redis.types';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../common/providers/utils/utils.service';
import { AuthMobileStrategy } from './strategy/auth.mobile.strategy';
import { AuthEmailStrategy } from './strategy/auth.email.strategy';

@Injectable()
export class AuthService {
  private readonly redisExpire: number;
  constructor(
    private readonly authContext: AuthContext,
    private readonly authMobileStrategy: AuthMobileStrategy,
    private readonly authEmailStrategy: AuthEmailStrategy,
    private readonly configService: ConfigService,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {
    this.redisExpire = this.configService.get<number>('REDIS_EXPIRE');
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
      this.redisExpire,
    );
    await this.authContext.sendVerification(
      sendVerificationRequest.verifier,
      message,
    );
    return of({
      verificationToken: message,
    });
  }

  async verifyValidationCode(
    verifyValidationCodeRequest: VerifyValidationCodeRequest,
  ): Promise<Observable<VerifyValidationCodeResponse>> {
    console.log('ssssssseeeeeee', verifyValidationCodeRequest);
    return of({
      message: 'Ok',
    });
  }
}
