import { Controller } from '@nestjs/common';
import { PlansService } from './plans.service';
import {
  CreatePlanRequestDto,
  ReadPlanRequestDto,
  UpdatePlanRequestDto,
} from './plans.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/common.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}
  @GrpcMethod('PlanService', 'CreatePlan')
  async create(createPlanRequest: CreatePlanRequestDto): Promise<any> {
    console.log({ createPlanRequest });
    return this.plansService.create(createPlanRequest);
  }

  @GrpcMethod('PlanService', 'ReadPlan')
  async read(readPlanRequest: ReadPlanRequestDto): Promise<any> {
    return this.plansService.read(readPlanRequest);
  }

  @GrpcMethod('PlanService', 'UpdatePlan')
  async update(updatePlanRequest: UpdatePlanRequestDto): Promise<any> {
    return this.plansService.update(updatePlanRequest);
  }

  @GrpcMethod('PlanService', 'DeletePlan')
  async delete(readPlanRequest: ReadPlanRequestDto): Promise<any> {
    return this.plansService.delete(readPlanRequest);
  }

  @GrpcMethod('PlanService', 'ListPlan')
  async list(paginationDto: PaginationDto): Promise<any> {
    return this.plansService.list(paginationDto);
  }
}
