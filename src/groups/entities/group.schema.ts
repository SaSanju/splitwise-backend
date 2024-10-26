// src/groups/entities/group.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  members: string[]; // Store member IDs or usernames

  @Prop({ type: [String], default: [] })
  admins: string[]; // Store admin IDs
}

export const GroupSchema = SchemaFactory.createForClass(Group);
