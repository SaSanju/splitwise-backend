// src/auth/entities/access-token.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccessTokenDocument = AccessToken & Document;

@Schema({ timestamps: true })
export class AccessToken {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  expireAt: Date; // Date when the token expires
}

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
