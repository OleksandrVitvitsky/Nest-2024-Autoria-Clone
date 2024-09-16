import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdsEntity } from '../../../database/entities/ads.entity';
import { ModelEntity } from "../../../database/entities/model.entity";

@Injectable()
export class ModelRepository extends Repository<ModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelEntity, dataSource.manager);
  }
}
