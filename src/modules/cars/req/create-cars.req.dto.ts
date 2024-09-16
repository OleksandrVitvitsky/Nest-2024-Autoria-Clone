import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { ModelReqDto } from './model.req.dto';

export class CreateCarsReqDto {
  @ApiProperty({
    example: 'Toyota',
    description: 'Назва бренду',
  })
  @IsString()
  @Transform(TransformHelper.toLowerCaseArray)
  @Transform(TransformHelper.trim)
  name: string;

  @ApiProperty({
    type: () => [ModelReqDto],
    description: 'Масив моделей автомобілів для бренду',
  })
  @IsArray()
  @Transform(TransformHelper.trimArray)
  @ValidateNested({ each: true })
  @Type(() => ModelReqDto)
  models: ModelReqDto[];
}
