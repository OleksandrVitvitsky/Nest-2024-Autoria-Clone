import { Column, Entity, ManyToOne } from 'typeorm';

import { CurrencyEnum } from '../../modules/advertisements/enum/currency.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { ModelEntity } from './model.entity';
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

  // @Column()
  // brand: string;

  @ManyToOne(() => ModelEntity, (model) => model.ads)
  model: ModelEntity;

  @Column('simple-array', { nullable: true })
  photos?: string[];

  @ManyToOne(() => UserEntity, (user) => user.ads)
  user: UserEntity;
}
