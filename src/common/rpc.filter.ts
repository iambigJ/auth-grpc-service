import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): any {
    return throwError(() => exception.getError());
  }
}

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return super.catch(exception, host);
  }
}
