import { Injectable } from '@nestjs/common';

export interface AuthStrategy {
  verify();
  login();
  signup();
  sendVerification(verifier: string, message: string);
  verifyVerification();
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
