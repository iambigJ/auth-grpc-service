import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './users.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

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

  async updateById(id: string, updated: Partial<Users>): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { ...updated });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = await this.userRepository.create(createUserDto);
    return this.userRepository.save(createdUser);
  }
}
