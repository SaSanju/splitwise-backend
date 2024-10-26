// src/groups/dtos/add-member.dto.ts
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class AddMemberDto {
  @IsMongoId({ message: 'Group ID must be a valid Object ID' }) // Validate as MongoDB ObjectId
  @IsNotEmpty({ message: 'Group ID is required' })
  groupId: string;

  @IsMongoId({ message: 'Member ID must be a valid Object ID' }) // Validate as MongoDB ObjectId
  @IsNotEmpty({ message: 'Member ID is required' })
  memberId: string;
}
