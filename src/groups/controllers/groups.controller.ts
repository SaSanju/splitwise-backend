// src/groups/controllers/groups.controller.ts
import { Controller, Post, Body, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { AddMemberDto } from '../dtos/add-member.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtInterceptor } from 'src/auth/middleware/jwt.interceptor';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard) // Protect the createGroup endpoint
  @UseInterceptors(JwtInterceptor)
  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    const userId = req.user.id; // Assuming user ID is stored in the JWT payload
    return this.groupsService.createGroup(createGroupDto, userId);
  }

  @UseGuards(JwtAuthGuard) // Protect the addMember endpoint
  @UseInterceptors(JwtInterceptor)
  @Post('add-member')
  async addMember(@Body() addMemberDto: AddMemberDto, @Request() req) {
    const userId = req.user.id; // Assuming user ID is stored in the JWT payload
    return this.groupsService.addMember(addMemberDto, userId);
  }

  @Post('remove-member')
  async removeMember(@Body() addMemberDto: AddMemberDto) {
    return this.groupsService.removeMember(addMemberDto);
  }
}
