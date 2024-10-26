// src/groups/groups.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups.controller';
import { Group, GroupSchema } from './entities/group.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]), // Registering the Group model
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
