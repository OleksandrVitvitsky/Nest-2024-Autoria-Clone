import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { CarEntity } from '../../../database/entities/car.entity';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }
}

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }
}
