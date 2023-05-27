import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

const GUARD_KEY: string = 'user_access_control';
const JWT_SECRET: string = config.get('jwt.jwt_secret');

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const data = this.reflector.get(GUARD_KEY, context.getHandler());

    if (!data) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    request.user = this.getTokenPayload(request.headers);

    return true;
  }
  public getTokenPayload(headers: any) {
    try {
      const authorization = headers.authorization;
      const token = authorization.replace(/Bearer /, '');
      const payload = jwt.verify(token, JWT_SECRET);

      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }
}


export const UserAuthGuard = (options: { protected: boolean } = { protected: false }) =>
  SetMetadata(GUARD_KEY, options);
