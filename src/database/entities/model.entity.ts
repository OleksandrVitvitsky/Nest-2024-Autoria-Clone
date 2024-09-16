import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AdsEntity } from './ads.entity';
import { BrandEntity } from './brand.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from "./models/create-update.model";

@Entity(TableNameEnum.MODELS)
export class ModelEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.models)
  brand: BrandEntity;

  @OneToMany(() => AdsEntity, (ads) => ads.model)
  ads: AdsEntity[];
}
