import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { PaginationDto } from '../common/dto/common.dto';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guard/auth.gaurd';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('UserService', 'List')
  async list(paginationDto: PaginationDto): Promise<Observable<any>> {
    return of(await this.usersService.find(paginationDto));
  }
}
