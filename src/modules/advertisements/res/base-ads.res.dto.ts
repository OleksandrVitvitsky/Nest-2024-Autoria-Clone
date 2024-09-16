import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { CurrencyEnum } from '../enum/currency.enum';

export class BaseAdsResDto {
  @IsUUID()
  id: string;
  title: string;
  description: string;
  price: number;
  @ApiProperty({ enum: CurrencyEnum, description: 'Валюта' })
  currency: CurrencyEnum;
  location: string;
  condition: string;
  year: number;
  mileage: number;
  // brand: string;
  @IsUUID()
  modelId: string;
  photos: string[];
  @IsUUID()
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
