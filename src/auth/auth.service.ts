import { Injectable } from '@nestjs/common';
import {
  SendVerificationRequest,
  SendVerificationResponse,
  VerifyValidationCodeRequest,
  VerifyValidationCodeResponse,
} from './auth.interface';
import { Observable, of } from 'rxjs';
import {
  AuthContext,
  AuthEmailStrategy,
  AuthMobileStrategy,
} from './strategy/auth.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly authContext: AuthContext,
    private readonly authMobileStrategy: AuthMobileStrategy,
    private readonly authEmailStrategy: AuthEmailStrategy,
  ) {}
  async sendVerification(
    sendVerificationRequest: SendVerificationRequest,
  ): Promise<Observable<SendVerificationResponse>> {
    if (sendVerificationRequest.strategy === 'email') {
      this.authContext.setStrategy(this.authEmailStrategy);
    } else {
      this.authContext.setStrategy(this.authMobileStrategy);
    }
    const message = 'it`s ok';
    await this.authContext.sendVerification(
      sendVerificationRequest.verifier,
      message,
    );
    return of({
      verificationToken: 'ok',
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
