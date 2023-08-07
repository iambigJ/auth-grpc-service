import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AuthContext,
  AuthEmailStrategy,
  AuthMobileStrategy,
} from './strategy/auth.strategy';
import { SmsService } from '../common/sms.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthContext,
    AuthEmailStrategy,
    AuthMobileStrategy,
    SmsService,
    ConfigService,
  ],
})
export class AuthModule {}
