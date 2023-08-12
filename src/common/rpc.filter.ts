import { RpcException } from '@nestjs/microservices';
import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): any {
    return throwError(() => exception.getError());
  }
}
