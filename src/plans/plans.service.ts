import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plans.entity';
import { CreatePlansDto, GetPlanRequestDto } from './plans.dto';
import { PaginationDto } from '../common/dto/common.dto';
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

  async get(getPlanRequest: GetPlanRequestDto): Promise<any> {
    return this.planRepository.findOneByOrFail({ id: getPlanRequest.planId });
  }

  async update(planId: string, updatePlanRequest: Partial<Plan>): Promise<any> {
    return this.planRepository.update(
      { id: planId },
      { data: updatePlanRequest.data },
    );
  }

  async delete(getPlanRequest: GetPlanRequestDto): Promise<any> {
    return this.planRepository.softDelete({ id: getPlanRequest.planId });
  }

  async list(
    paginationDto: PaginationDto,
  ): Promise<{ rows: Plan[]; count: number }> {
    const [rows, count] = await this.planRepository.findAndCount({
      skip: (paginationDto.page - 1) * (paginationDto.count + 1),
      take: paginationDto.count,
    });
    return {
      rows,
      count,
    };
  }
}
