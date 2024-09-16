import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { ModelReqDto } from '../../models/req/model.req.dto';

export class CreateCarsReqDto {
  @ApiProperty({
    example: 'Toyota',
    description: 'Назва бренду',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: () => [ModelReqDto], // Використовуємо функцію для визначення типу
    description: 'Масив моделей автомобілів для бренду',
  })
  @IsArray()
  @Transform(TransformHelper.trimArray)
  @ValidateNested({ each: true })
  @Type(() => ModelReqDto)
  models: ModelReqDto[];
}
