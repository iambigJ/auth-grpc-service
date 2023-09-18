import { Controller, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import {
  CreatePlanRequestDto,
  GetPlanRequestDto,
  UpdatePlanRequestDto,
} from './plans.dto';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/common.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guard/auth.gaurd';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('PlanService', 'CreatePlan')
  async create(createPlanRequest: CreatePlanRequestDto): Promise<any> {
    try {
      return await this.plansService.create(createPlanRequest);
    } catch (e) {
      throw new RpcException({ code: 3, message: e.message });
    }
  }
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('PlanService', 'ReadPlan')
  async get(getPlanRequestDto: GetPlanRequestDto): Promise<any> {
    try {
      return await this.plansService.get(getPlanRequestDto);
    } catch (e) {
      throw new RpcException({ code: 3, message: 'Not Found' });
    }
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('PlanService', 'UpdatePlan')
  async update(updatePlanRequest: UpdatePlanRequestDto): Promise<any> {
    return this.plansService.update(updatePlanRequest.id, updatePlanRequest);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('PlanService', 'DeletePlan')
  async delete(readPlanRequest: GetPlanRequestDto): Promise<any> {
    return this.plansService.delete(readPlanRequest);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('PlanService', 'ListPlan')
  async list(paginationDto: PaginationDto): Promise<any> {
    return await this.plansService.list(paginationDto);
  }
}
