import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plans.entity';
import { CreatePlansDto, ReadPlanRequestDto, UpdatePlanRequestDto } from "./plans.dto";
import { PaginationDto } from "../common/dto/common.dto";
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

  async read(readPlanRequest: ReadPlanRequestDto): Promise<any> {
    // Implement your logic to read a plan here
  }

  async update(updatePlanRequest: UpdatePlanRequestDto): Promise<any> {
    // Implement your logic to update a plan here
  }

  async delete(readPlanRequest: ReadPlanRequestDto): Promise<any> {
    // Implement your logic to delete a plan here
  }

  async list(paginationDto: PaginationDto): Promise<any> {
    // Implement your logic to list plans here
  }
}
