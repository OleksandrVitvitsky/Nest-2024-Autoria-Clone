import { Column, Entity, OneToMany } from 'typeorm';

import { AdsEntity } from './ads.entity'; // Замініть шлях на актуальний
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model'; // Замініть шлях на актуальний
import { UserEntity } from './user.entity'; // Замініть шлях на актуальний

@Entity(TableNameEnum.DEALER)
export class DealerEntity extends CreateUpdateModel {
  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CarEntity, (car) => car.dealer)
  cars: CarEntity[];

  @OneToMany(() => UserEntity, (user) => user.dealer)
  users: UserEntity[];

  @OneToMany(() => AdsEntity, (ads) => ads.dealer)
  ads: AdsEntity[];
}
