import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
import { EmailModule } from './email/email.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, RedisModule, EmailModule],
})
export class AppModule {}
