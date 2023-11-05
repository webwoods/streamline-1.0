import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      /**
       * checks whether the route or method is marked as public using a custom decorator IS_PUBLIC_KEY. If marked as public, it allows access without further checks.
       */
      return true;
    }

    /**
     * If not public, it retrieves the request object from the execution context and extracts the JWT token from the Authorization header.
     */
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      /**
       * If a token is found, it attempts to verify the token using the JwtService. If the verification fails, it also throws an UnauthorizedException.
       */
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      /**
       * Assigning the payload to the request object here in order to access it in our route handlers
       */
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    /**
     * This is a helper method that takes a Request object and extracts the JWT token from the Authorization header.
     */
    console.log(request.headers);
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
