import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipeCustom } from './common/validation.pipe';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(__dirname, 'auth/proto/auth.proto'),
        url: `${process.env.GRPC_URL}`,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipeCustom({ transform: true, whitelist: true }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen();
}
bootstrap();
