import { SignupDto } from '../dto/auth.dto';
import { CreateUserDto } from '../../users/users.dto';

export class AuthMapper {
  static toPersistence(
    singUpDto: SignupDto & { planId: string },
  ): CreateUserDto {
    return {
      email: singUpDto.email,
      mobile: singUpDto.mobile,
      password: singUpDto.password,
      referralCode: singUpDto.referralCode,
      profile: singUpDto.profile,
      role: 'user',
      planId: singUpDto.planId,
    };
  }
}
