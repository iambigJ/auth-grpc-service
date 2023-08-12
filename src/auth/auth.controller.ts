import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  SendVerificationResponse,
  VerifyValidationCodeResponse,
} from './auth.interface';
import { AuthService } from './auth.service';
import { SendVerificationDto, VerifyValidationCodeDto } from './dto/auth.dto';
import { GrpcExceptionFilter } from '../common/rpc.filter';
import { AuthValidator } from './auth.validator';
import { RPC_BAD_REQUEST } from '../common/messages';

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
}