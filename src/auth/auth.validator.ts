import { SendVerificationRequest } from './auth.interface';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
export class Validator {
  static isEmail(email: string): boolean {
    return new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(email);
  }

  static isMobile(mobile: string): boolean {
    return new RegExp('^(0)(9)[0-9]{9}$').test(mobile);
  }
}

export class AuthValidator {
  static isSendVerificationValidate(dto: SendVerificationRequest): boolean {
    switch (dto.strategy) {
      case 'email':
        return Validator.isEmail(dto.verifier);
      case 'mobile':
        return Validator.isMobile(dto.verifier);
      default:
        return false;
    }
  }
}
