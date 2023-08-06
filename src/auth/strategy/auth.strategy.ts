import { Injectable } from '@nestjs/common';

export interface AuthStrategy {
  verify();
  login();
  signup();
  sendVerification(verifier: string);
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
  login() {
    return 'mlogin';
  }

  signup() {
    return 'msignup';
  }

  verify() {
    return 'mverify';
  }
  sendVerification(verifier) {
    return verifier + 'msendVerification';
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

  sendVerification(verifier: string) {
    return this.strategy.sendVerification(verifier);
  }

  verifyVerification() {
    return this.strategy.verifyVerification();
  }
}
