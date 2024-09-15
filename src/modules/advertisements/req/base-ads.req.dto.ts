import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString, IsUUID,
  Length,
  Matches,
  Max,
  Min
} from "class-validator";
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { ConditionEnum } from '../enum/condition.enum';
import { CurrencyEnum } from '../enum/currency.enum';
import { LocationEnum } from '../enum/location.enum';

export class BaseAdsReqDto {
  @ApiProperty({
    example: 'Продам авто Toyota Camry 2018 року',
    description: 'Заголовок оголошення, що відображає основну інформацію',
  })
  @IsString()
  @IsNotEmpty({ message: 'Заголовок не може бути порожнім' })
  @Length(10, 150, {
    message: 'Заголовок має бути не менше за 10 та не більше 150 символів',
  })
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Заголовок може містити тільки букви, цифри та пробіли',
  })
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty({
    example:
      'Автомобіль у відмінному стані, не битий, не фарбований. Пробіг 50,000 км.',
    description:
      'Опис оголошення, що містить деталі про автомобіль та умови продажу',
  })
  @IsString()
  @IsNotEmpty({ message: 'Опис не може бути порожнім' })
  @Length(10, 3000, {
    message: 'Опис має бути не менше за 10 та не більше 3000 символів',
  })
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Заголовок може містити тільки букви, цифри та пробіли',
  })
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty({
    example: 15000,
    description: 'Ціна автомобіля',
  })
  @IsNumber({}, { message: 'Ціна повинна бути числом' })
  @IsPositive({ message: 'Ціна повинна бути додатньою' })
  @Min(0, { message: 'Ціна не може бути менше 0' })
  @Max(10000000, { message: 'Ціна не може перевищувати 1 000 0000' })
  @IsNotEmpty({ message: 'Ціна повинна бути заповненою' })
  price: number;

  @ApiProperty({
    example: 'USD',
    enum: CurrencyEnum,
    description: 'Валюта ціни (USD, EUR, UAH)',
  })
  @IsEnum(CurrencyEnum)
  @IsIn([CurrencyEnum.EUR, CurrencyEnum.UAH, CurrencyEnum.USD])
  currency: CurrencyEnum;

  @ApiProperty({
    example: 'Київ, Україна',
    enum: LocationEnum,
    description: 'Місцезнаходження автомобіля',
  })
  @IsEnum(LocationEnum)
  location: LocationEnum;

  @ApiProperty({
    example: 'USED',
    enum: ConditionEnum,
    description: 'Стан автомобіля (нове, б/в, відремонтований)',
  })
  @IsEnum(ConditionEnum)
  condition: ConditionEnum;

  @ApiProperty({
    example: true,
    description: 'Чи доречний торг (можливість домовитись про зниження ціни)',
    default: false,
  })
  @IsOptional()
  isNegotiable?: boolean;

  @ApiProperty({ example: 1, description: 'Ідентифікатор бренду' })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Бренд повинен бути обраний' })
  brandId: number;

  @ApiProperty({ example: 5, description: 'Ідентифікатор моделі автомобіля' })
  @IsInt()
  @IsNotEmpty({ message: 'Модель повинна бути обрана' })
  @Type(() => Number)
  @IsUUID()
  @IsNotEmpty()
  modelId: number;

  @ApiProperty({ example: 2020, description: 'Рік випуску автомобіля' })
  @IsInt()
  @Min(1991)
  @Max(new Date().getFullYear())
  @Type(() => Number)
  @IsNotEmpty({ message: 'Рік повинен бути заповненим' })
  year: number;

  @ApiProperty({
    example: 50000,
    description: 'Пробіг автомобіля (в кілометрах)',
  })
  @IsPositive()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Пробіг повинен бути заповненим' })
  mileage: number;

  // @ApiProperty({ example: ['https://example.com/car1.jpg', 'https://example.com/car2.jpg'], description: 'Масив URL-адрес фото автомобіля' })
  // photos: string[];

  // @ApiProperty({
  //   description: 'The ID of the car being sold',
  //   example: 'd4e7f7a3-8fd3-4c3b-9c4f-d828e7b9db6c', // Example UUID
  // })
  // @IsUUID()
  // @IsNotEmpty()
  // userId: number;
}
