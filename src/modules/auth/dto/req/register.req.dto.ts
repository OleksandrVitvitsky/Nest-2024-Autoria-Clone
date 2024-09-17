import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";

import { UserAccountTypeEnum } from '../../../users/enum/user-account-type.enum';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class RegisterReqDto extends PickType(BaseAuthReqDto, [
  'userName',
  'email',
  'password',
  'phone',
  'deviceId',
  'role',
  'accountType',
  'dealer',
]) {
   // @ApiProperty({
   //   description: 'ID автосалону, якщо користувач належить до автосалону',
   //   example: '1e43a56d-9307-4f50-8e1c-9784b15e8c3f',
   //   required: false,
   // })
   // @IsOptional()
   // @IsUUID()
   // dealer?: string;


}
