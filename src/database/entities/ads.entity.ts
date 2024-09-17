import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { CurrencyEnum } from '../../common/global-enums/currency.enum';
import { AdViewEntity } from "./ads.views.entity";
import { DealerEntity } from './dealer.entity';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ADS)
export class AdsEntity extends CreateUpdateModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: CurrencyEnum })
  currency: CurrencyEnum;

  @Column('text')
  location: string;

  @Column('text')
  condition: string;

  @Column('int')
  year: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column('int')
  mileage: number;

  @Column('int', { default: 0 })
  editQuantity: number;

  @ManyToOne(() => CarEntity, (model) => model.ads)
  model: CarEntity;

  @Column('simple-array', { nullable: true })
  photos?: string[];

  @ManyToOne(() => UserEntity, (user) => user.ads)
  user: UserEntity;

  @OneToMany(() => AdViewEntity, (view) => view.ad)
  views: AdViewEntity[];

}
