import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  exports: [TypeOrmModule],
})
export class PlansModule {}
