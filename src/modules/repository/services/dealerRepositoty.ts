import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { CarEntity } from '../../../database/entities/car.entity';
import { DealerEntity } from "../../../database/entities/dealer.entity";

@Injectable()
export class DealerRepositoty extends Repository<DealerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DealerEntity, dataSource.manager);
  }
}



