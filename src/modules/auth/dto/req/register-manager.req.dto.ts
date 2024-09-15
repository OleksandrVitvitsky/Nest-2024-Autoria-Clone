import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

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
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsNotEmpty({ message: 'The role must not be empty' })
  @IsIn([UserRoleEnum.MANAGER], {
    message: 'Role must be manager',
  })
  role: UserRoleEnum;
}
