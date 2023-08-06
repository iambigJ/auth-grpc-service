import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AuthContext,
  AuthEmailStrategy,
  AuthMobileStrategy,
} from './strategy/auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthContext, AuthEmailStrategy, AuthMobileStrategy],
})
export class AuthModule {}
