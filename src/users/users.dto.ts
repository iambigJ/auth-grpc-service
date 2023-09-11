import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsMobile } from '../auth/custom.validator';
import { Transform, Type } from 'class-transformer';
import { Role } from '../auth/enums/role.enum';

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

  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(Role)
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  planId: string;
}

export class GetUserDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class BulkUpdateUserDto {
  @IsUUID('all', { each: true })
  userIds: string[];

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsUUID()
  planId: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'emailVerified',
  'mobile',
  'email',
  'role',
  'profile',
]) {
  @IsUUID()
  userId: string;
}

export class UpdateProfileDto extends PartialType<UserProfileDto>(
  UserProfileDto,
) {}
