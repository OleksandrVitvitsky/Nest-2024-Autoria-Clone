import { Column, Entity, ManyToOne } from 'typeorm';

import { CurrencyEnum } from '../../common/global-enums/currency.enum';
import { DealerEntity } from "./autodealer.entity";
import { TableNameEnum } from './enums/table-name.enum';
import { CarEntity } from './car.entity';
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

  @Column('int')
  mileage: number;

  @ManyToOne(() => CarEntity, (model) => model.ads)
  model: CarEntity;

  @Column('simple-array', { nullable: true })
  photos?: string[];

  @ManyToOne(() => UserEntity, (user) => user.ads)
  user: UserEntity;

  @ManyToOne(() => DealerEntity, (Dealer) => Dealer.ads)
  Dealer: DealerEntity;
}
