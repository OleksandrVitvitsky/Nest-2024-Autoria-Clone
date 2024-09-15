import { PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { UserAccountTypeEnum } from '../../../users/enum/user-account-type.enum';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class RegisterReqDto extends PickType(BaseAuthReqDto, [
  'userName',
  'email',
  'password',
  'phone',
  'deviceId',
  'role',
]) {
  @IsOptional()
  @IsEnum(UserAccountTypeEnum)
  accountType?: UserAccountTypeEnum;
}
