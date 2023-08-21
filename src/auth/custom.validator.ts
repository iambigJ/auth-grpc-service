import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const passRegEx =
            /^(?!.*(.).*\1.*\1.*\1)(?=.*[0-9])(?=.*[a-z]).{6,}$/;
          return typeof value === 'string' && passRegEx.test(value);
        },
      },
    });
  };
}

export function IsMobile(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isMobile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const passRegEx = /^(0)(9)[0-9]{9}$/;
          return typeof value === 'string' && passRegEx.test(value);
        },
      },
    });
  };
}

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    //Todo: check it after create user
    try {
      const strategy = (args.object as any)['strategy'];
      switch (strategy) {
        case 'email':
          return !(await this.usersService.findByEmail(value));
        case 'mobile':
          return !(await this.usersService.findByMobile(value));
        default:
          return false;
      }
    } catch (e) {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}
