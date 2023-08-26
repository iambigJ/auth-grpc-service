import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PlansModule } from './plans/plans.module';
import { Users } from './users/users.entity';
import { Plan } from './plans/plans.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Users, Plan],
        //TODO: remove in production
        synchronize: false,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    RedisModule,
    EmailModule,
    UsersModule,
    PlansModule,
  ],
})
export class AppModule {}
