import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { AdsEntity } from './ads.entity';
import { BrandEntity } from './brand.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.CARS)
export class CarEntity extends CreateUpdateModel {
  @Index()
  @Column('text')
  name: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.models, {
    onDelete: 'CASCADE',
  })
  brand: BrandEntity;

  @OneToMany(() => AdsEntity, (ads) => ads.model)
  ads: AdsEntity[];
}
