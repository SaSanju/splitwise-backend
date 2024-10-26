// src/users/entities/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], default: ['user'] }) // Default role is 'user'
  roles: string[];
  
  id: string;
}

// Create the User schema
export const UserSchema = SchemaFactory.createForClass(User);
