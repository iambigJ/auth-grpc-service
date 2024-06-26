import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthContext } from './strategy/auth.strategy';
import { SmsService } from '../common/providers/sms.service';
import { redisClientFactory } from '../common/redis/redis.factory';
import { AuthEmailStrategy } from './strategy/auth.email.strategy';
import { AuthMobileStrategy } from './strategy/auth.mobile.strategy';
import { UsersModule } from '../users/users.module';
import { UserExistsRule } from './custom.validator';
import { PlansModule } from '../plans/plans.module';

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
    UserExistsRule,
  ],
  imports: [
    UsersModule,
    PlansModule,
    JwtModule.register({
      global: true,
    }),
  ],
})
export class AuthModule {}
