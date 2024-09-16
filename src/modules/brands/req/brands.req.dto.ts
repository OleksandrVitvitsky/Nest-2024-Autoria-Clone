import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BrandsReqDto {
  @ApiProperty({
    example: 'Corolla',
    description: 'Назва моделі автомобіля',
  })
  @IsString()
  name: string;
}