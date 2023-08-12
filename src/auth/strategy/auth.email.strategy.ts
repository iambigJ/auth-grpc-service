import { Injectable } from '@nestjs/common';
import { EmailService } from '../../email/email.service';
import { AuthStrategy } from './auth.strategy';

@Injectable()
export class AuthEmailStrategy implements AuthStrategy {
  constructor(private readonly emailService: EmailService) {}
  login() {
    return 'login';
  }

  signup() {
    return 'signup';
  }

  verify() {
    return 'verify';
  }

  sendVerification(verifier: string, message: string) {
    return this.emailService.send(verifier, message);
  }
}
