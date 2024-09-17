import { Column, Entity, Index, OneToMany } from "typeorm";

import { TableNameEnum } from './enums/table-name.enum';
import { CarEntity } from './car.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.BRANDS)
export class BrandEntity extends CreateUpdateModel {
  @Index()
  @Column('text')
  name: string;

  @OneToMany(() => CarEntity, (model) => model.brand,{nullable:true})
  models?: CarEntity[];
}
