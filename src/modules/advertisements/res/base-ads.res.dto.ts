import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { CurrencyEnum } from '../enum/currency.enum';

export class BaseAdsResDto {
  @IsUUID()
  id: number;
  title: string;
  description: string;
  price: number;
  @ApiProperty({ enum: CurrencyEnum, description: 'Валюта' })
  currency: CurrencyEnum;
  location: string;
  condition: string;
  year: number;
  mileage: number;
  brand: string;
  model: string;
  photos: string[];
  @IsUUID()
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
