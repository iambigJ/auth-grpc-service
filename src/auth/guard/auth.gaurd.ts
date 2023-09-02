import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToRpc().getContext();
    const data = context.switchToRpc().getData();
    if (!data.token) {
      return false;
    }
    try {
      const decoded = await this.jwtService.verifyAsync(data.token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      ctx.set('user', decoded);
    } catch (e) {
      return false;
    }
    return true;
  }
}
