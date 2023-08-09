import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, RedisModule],
})
export class AppModule {}
