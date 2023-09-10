import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { PaginationDto } from '../common/dto/common.dto';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guard/auth.gaurd';
import { Users } from './users.entity';
import { TokenClaim } from '../auth/auth.interface';
import { Metadata } from '@grpc/grpc-js';
import { GetUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('UserService', 'List')
  async list(paginationDto: PaginationDto): Promise<Observable<any>> {
    return of(await this.usersService.find(paginationDto));
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @GrpcMethod('UserService', 'get')
  async get(
    getUserDto: GetUserDto,
  ): Promise<Observable<Pick<Users, 'password'>>> {
    return of(await this.usersService.findById(getUserDto.userId));
  }

  @UseGuards(AuthGuard)
  @GrpcMethod('UserService', 'me')
  async me(
    {},
    metadata: Metadata,
  ): Promise<Observable<Pick<Users, 'password'>>> {
    const user = metadata.get('user')[0] as unknown as TokenClaim;
    return of(await this.usersService.findById(user.id));
  }
}
