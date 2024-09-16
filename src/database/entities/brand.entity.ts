import { Column, Entity, OneToMany } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity'; // імпортуємо ModelEntity

@Entity(TableNameEnum.BRANDS)
export class BrandEntity {
  @Column('text')
  name: string;

  @OneToMany(() => ModelEntity, (model) => model.brand)
  models: ModelEntity[];
}
