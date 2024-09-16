import { Column, Entity, OneToMany } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';
import { CreateUpdateModel } from './models/create-update.model'; // імпортуємо ModelEntity

@Entity(TableNameEnum.BRANDS)
export class BrandEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @OneToMany(() => ModelEntity, (model) => model.brand)
  models: ModelEntity[];
}
