import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ValidationPipeCustom
  extends ValidationPipe
  implements PipeTransform<any>
{
  constructor(options) {
    super(options);
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new RpcException({ code: 3, message: errors });
    }
    return value;
  }
  toValidate(metatype: any): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
