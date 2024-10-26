// src/auth/middleware/jwt.interceptor.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AccessTokenService } from '../services/access-token.service';

@Injectable()
export class JwtInterceptor implements NestMiddleware {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
      return next(); // If no token, just move to the next middleware
    }

    try {
      const accessTokenData = await this.accessTokenService.findToken(token);
      req.userId = accessTokenData.userId; // Attach userId to the request
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    next();
  }
}
