import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Users } from './users.entity';
import {
  CreateUserDto,
  BulkUpdateUserDto,
  DeleteUsersDto,
  ActiveUsersDto,
} from './users.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { PaginationDto } from '../common/dto/common.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  findByEmail(email: string): Promise<Users> {
    return this.userRepository.findOneByOrFail({ email });
  }

  findByMobile(mobile: string): Promise<Users> {
    return this.userRepository.findOneByOrFail({ mobile });
  }

  async findByEmailOrMobile(email: string, mobile: string): Promise<Users> {
    return this.userRepository.findOneByOrFail({
      email,
      mobile,
    });
  }
  async findById(id: string): Promise<Users> {
    return this.userRepository.findOneByOrFail({
      id,
    });
  }
  async find(
    paginationDto: PaginationDto,
  ): Promise<{ rows: Users[]; count: number }> {
    const [rows, count] = await this.userRepository.findAndCount({
      skip: paginationDto.page,
      take: paginationDto.count,
    });
    return {
      rows,
      count,
    };
  }

  async updateById(id: string, updated: Partial<Users>): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { ...updated });
  }

  async updateByIds(updateUserDto: BulkUpdateUserDto): Promise<UpdateResult> {
    const { userIds, ...update } = updateUserDto;
    return this.userRepository.update({ id: In(userIds) }, { ...update });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = await this.userRepository.create(createUserDto);
    return this.userRepository.save(createdUser);
  }

  async delete(deleteUsersDto: DeleteUsersDto): Promise<any> {
    return this.userRepository.softDelete({ id: In(deleteUsersDto.userIds) });
  }

  async restore(activeUserDto: ActiveUsersDto): Promise<any> {
    return this.userRepository.restore({ id: In(activeUserDto.userIds) });
  }
}
