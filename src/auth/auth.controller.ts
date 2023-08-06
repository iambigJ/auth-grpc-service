import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  SendVerificationRequest,
  SendVerificationResponse,
  VerifyValidationCodeRequest,
  VerifyValidationCodeResponse,
} from './auth.interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.validator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @GrpcMethod('AuthService', 'SendVerification')
  async sendVerification(
    sendVerificationRequest: CreateUserDto,
  ): Promise<Observable<SendVerificationResponse>> {
    try {
      return await this.authService.sendVerification(sendVerificationRequest);
    } catch (e) {
      throw 'not ok';
    }
  }
  @GrpcMethod('AuthService', 'VerifyValidationCode')
  async verifyValidationCode(
    verifyValidationCodeRequest: VerifyValidationCodeRequest,
  ): Promise<Observable<VerifyValidationCodeResponse>> {
    return await this.authService.verifyValidationCode(
      verifyValidationCodeRequest,
    );
  }
}
