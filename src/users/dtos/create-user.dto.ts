// src/users/dtos/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsArray({ message: 'Roles must be an array of strings' })
  @IsOptional()
  roles?: string[]; // Make roles optional during user creation
}
