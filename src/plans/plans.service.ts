import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plans.entity';
import { CreatePlansDto } from './plans.dto';
@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
  ) {}

  create(createPlanDto: CreatePlansDto): Promise<Plan> {
    const createdPlan = this.planRepository.create(createPlanDto);
    return this.planRepository.save(createdPlan);
  }
  findByName(name: string): Promise<Plan> {
    return this.planRepository.findOneByOrFail({ name });
  }
}
