import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { UserRoleEnum } from '../../../users/enum/role.enum';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class RegisterManagerReqDto extends PickType(BaseAuthReqDto, [
  'userName',
  'email',
  'password',
  'phone',
  'deviceId',
]) {
  @ApiProperty({
    description: 'Role of the user. Allowed value - manager',
    enum: ['manager'],
  })
  @Transform(TransformHelper.trim)
  @IsString()
  @IsNotEmpty({ message: 'The role must not be empty' })
  @IsIn([UserRoleEnum.MANAGER], {
    message: 'Role must be manager',
  })
  role: UserRoleEnum;

  @ApiProperty({
    description: 'ID автосалону, якщо користувач належить до автосалону',
    example: '1e43a56d-9307-4f50-8e1c-9784b15e8c3f',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  dealer?: string;
}
