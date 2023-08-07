import { Injectable } from '@nestjs/common';
import { SmsService } from '../../common/sms.service';

export interface AuthStrategy {
  verify();
  login();
  signup();
  sendVerification(verifier: string, message: string);
  verifyVerification();
}

@Injectable()
export class AuthEmailStrategy implements AuthStrategy {
  login() {
    return 'login';
  }

  signup() {
    return 'signup';
  }

  verify() {
    return 'verify';
  }

  sendVerification(verifier: string) {
    return verifier + 'sendVerification';
  }

  verifyVerification() {
    return 'verifyVerification()';
  }
}
@Injectable()
export class AuthMobileStrategy implements AuthStrategy {
  constructor(private readonly smsService: SmsService) {}
  login() {
    return 'mlogin';
  }

  signup() {
    return 'msignup';
  }

  verify() {
    return 'mverify';
  }
  async sendVerification(verifier: string, message: string): Promise<any> {
    return await this.smsService.send(verifier, message);
  }

  verifyVerification() {
    return 'mverifyVerification()';
  }
}
@Injectable()
export class AuthContext {
  private strategy: AuthStrategy;
  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  login() {
    return this.strategy.login();
  }

  signup() {
    return this.strategy.signup();
  }

  verify() {
    return this.strategy.verify();
  }

  async sendVerification(verifier: string, message: string) {
    return await this.strategy.sendVerification(verifier, message);
  }

  verifyVerification() {
    return this.strategy.verifyVerification();
  }
}
