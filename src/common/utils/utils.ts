// src/common/utils/utils.ts

import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

/**
 * Validates a MongoDB ObjectId and throws a NotFoundException if invalid.
 * @param userId - The user ID to validate.
 */
export function validateObjectId(id: string, type: string): void {
  if (!Types.ObjectId.isValid(id)) {
    throw new NotFoundException(`${type} ID is not a valid ObjectId`);
  }
}