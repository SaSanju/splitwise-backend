// src/auth/services/access-token.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessToken, AccessTokenDocument } from '../entities/access-token.schema';

@Injectable()
export class AccessTokenService {
  constructor(@InjectModel(AccessToken.name) private accessTokenModel: Model<AccessTokenDocument>) {}

  async createAccessToken(userId: string, token: string, expiresIn: number): Promise<AccessToken> {
    const expireAt = new Date(Date.now() + expiresIn * 1000);
    const accessToken = new this.accessTokenModel({ userId, accessToken: token, expireAt });
    return accessToken.save();
  }

  async findToken(token: string): Promise<AccessToken> {
    const accessToken = await this.accessTokenModel.findOne({ accessToken: token });
    if (!accessToken || accessToken.expireAt < new Date()) {
      throw new NotFoundException('Token not found or expired');
    }
    return accessToken;
  }
}
