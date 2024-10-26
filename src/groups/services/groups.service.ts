// src/groups/services/groups.service.ts
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../entities/group.schema';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { AddMemberDto } from '../dtos/add-member.dto';
import { UsersService } from '../../users/services/users.service';
import { validateObjectId } from 'src/common/utils/utils';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private readonly usersService: UsersService,
) {}

  async createGroup(createGroupDto: CreateGroupDto, userId: string): Promise<Group> {
    const group = new this.groupModel({ 
      ...createGroupDto, 
      admins: [userId], // Automatically assign creator as admin
      members: [userId] // Automatically add creator as a member
    });
    return group.save();
  }

  async addMember(addMemberDto: AddMemberDto, userId: string): Promise<Group> {
    const { groupId, memberId } = addMemberDto;
    validateObjectId(groupId, 'Group');
    const group = await this.groupModel.findById(groupId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if the user is an admin
    if (!group.admins.includes(userId)) {
      throw new ForbiddenException('Only group admins can add members');
    }

    // Check if the memberId is a valid user
    const member = await this.usersService.findById(memberId);;
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (!group.members.includes(memberId)) {
      group.members.push(memberId); // Add member to the group
      return group.save();
    }

    throw new ConflictException('Member already exists in the group'); // Or handle as needed
  }

  async removeMember(addMemberDto: AddMemberDto): Promise<Group> {
    const { groupId, memberId } = addMemberDto;
    validateObjectId(groupId, 'Group');
    const group = await this.groupModel.findById(groupId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    group.members = group.members.filter(member => member !== memberId); // Remove member
    return group.save();
  }
}
