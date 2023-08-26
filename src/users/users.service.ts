import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './users.dto';

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

  findByEmailOrMobile(email: string, mobile: string): Promise<Users> {
    return this.userRepository.findOneByOrFail({
      email,
      mobile,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = await this.userRepository.create(createUserDto);
    return this.userRepository.save(createdUser);
  }
}
