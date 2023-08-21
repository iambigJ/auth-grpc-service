import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { IsMobile, IsPassword, UserExistsRule } from '../auth/custom.validator';
import { Type } from 'class-transformer';

export class UserProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  defaultAiModel: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ValidateIf((o) => o.strategy === 'email')
  email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.strategy === 'mobile')
  @IsMobile()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  referralCode: string;

  @Type(() => UserProfileDto)
  profile: UserProfileDto;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @IsString()
  @IsNotEmpty()
  role: string;
}
