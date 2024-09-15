import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class AdsRepository extends Repository<AdsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdsEntity, dataSource.manager);
  }
}