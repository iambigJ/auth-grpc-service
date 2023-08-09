import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthContext } from './strategy/auth.strategy';
import { SmsService } from '../common/providers/sms.service';
import { ConfigService } from '@nestjs/config';
import { redisClientFactory } from '../common/redis/redis.factory';
import { AuthEmailStrategy } from './strategy/auth.email.strategy';
import { AuthMobileStrategy } from './strategy/auth.mobile.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthContext,
    AuthEmailStrategy,
    AuthMobileStrategy,
    SmsService,
    redisClientFactory,
    ConfigService,
  ],
})
export class AuthModule {}
