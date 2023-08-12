import { Injectable } from '@nestjs/common';
import { SmsService } from '../../common/providers/sms.service';
import { AuthStrategy } from './auth.strategy';

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
}
