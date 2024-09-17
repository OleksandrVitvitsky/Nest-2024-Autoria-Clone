import { PickType } from '@nestjs/swagger';
import { IsOptional, IsUUID } from "class-validator";

import { BaseUserResDto } from './base-user.res.dto';

export class UserResDto extends PickType(BaseUserResDto, [
  'id',
  'userName',
  'email',
  'image',
  'phone',
  'accountType',
  'role',
 "isActive"
]) {
  @IsOptional()
  @IsUUID()
  dealer?: string;
}
