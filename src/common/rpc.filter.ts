import { RpcException } from '@nestjs/microservices';
import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): any {
    return throwError(() => exception.getError());
  }
}
