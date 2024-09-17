import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString, IsUUID,
  Length,
  Matches
} from "class-validator";

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { UserRoleEnum } from '../../enum/role.enum';
import { UserAccountTypeEnum } from '../../enum/user-account-type.enum';

export class BaseUserReqDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  userName?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 300)
  @IsEmail()
  @IsNotEmpty()
  @Transform(TransformHelper.toLowerCase)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @Transform(TransformHelper.trim)
  @IsString()
  @Length(0, 300)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @IsPhoneNumber()
  @Length(10, 13)
  @Matches(/^[+][0-9]+$/)
  phone?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.toLowerCase)
  @Length(0, 10000)
  image?: string;

  @ApiProperty({
    description: 'Роль користувача. Можливі значення: buyer, seller',
    enum: ['seller', 'buyer'],
  })
  @IsEnum(UserRoleEnum)
  @IsNotEmpty({ message: 'Роль повинна бути обраною' })
  @IsIn([UserRoleEnum.BUYER, UserRoleEnum.SELLER], {
    message: 'Роль повинна бути buyer або seller',
  })
  role: UserRoleEnum;

  @ApiProperty({
    description: 'Account type of user. Allowed values:  BASIC or PREMIUM',
    enum: ['BASIC', 'PREMIUM'],
  })
  @IsEnum(UserAccountTypeEnum)
  @IsIn([UserAccountTypeEnum.BASIC])
  accountType?: UserAccountTypeEnum;

   @ApiProperty({
     description: 'ID автосалону, якщо користувач належить до автосалону',
     example: '1e43a56d-9307-4f50-8e1c-9784b15e8c3f',
     required: false,
   })
   @IsOptional()
   @IsUUID()
   dealer?: string;

}
