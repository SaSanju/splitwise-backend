// src/auth/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { AccessTokenService } from './access-token.service';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, roles: user.roles }; // Include roles if needed
    const token = this.jwtService.sign(payload)
    const expiresIn = 3600; // Set your desired expiration time
    this.accessTokenService.createAccessToken(user.id, token, expiresIn);
    return {
      access_token: token,
      userId: user.id
    };
  }

}
