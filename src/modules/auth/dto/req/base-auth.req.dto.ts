import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseUserReqDto } from '../../../users/dto/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'userName',
  'email',
  'password',
  'phone',
  'image',
  'role',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
