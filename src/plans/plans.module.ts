import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plans.entity';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  exports: [TypeOrmModule, PlansService],
  providers: [PlansService, ConfigService],
  controllers: [PlansController],
})
export class PlansModule {}
