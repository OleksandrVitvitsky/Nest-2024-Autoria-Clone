import { Column, Entity, OneToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.DEALERS)
export class DealerEntity extends CreateUpdateModel {
  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => CarEntity, (car) => car.dealer, { nullable: true })
  cars?: CarEntity[];

  @OneToMany(() => UserEntity, (user) => user.dealer, { nullable: true })
  users?: UserEntity[];
}
