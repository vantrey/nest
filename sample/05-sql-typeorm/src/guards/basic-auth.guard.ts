import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const basicAuthBase64 = 'YWRtaW46cXdlcnR5';
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (token !== `Basic ${basicAuthBase64}`) {
      throw new UnauthorizedException('Auth Token is not valid');
    }

    return true;
  }
}
