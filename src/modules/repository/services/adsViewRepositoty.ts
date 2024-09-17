import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AdViewEntity } from "../../../database/entities/ads.views.entity";

@Injectable()
export class AdViewRepository extends Repository<AdViewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdViewEntity, dataSource.manager);
  }

}



