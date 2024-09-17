import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { AdsEntity } from './ads.entity';
import { TableNameEnum } from "./enums/table-name.enum";

@Entity(TableNameEnum.ADS_VIEWS)
export class AdViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AdsEntity, (ad) => ad.views)
  ad: AdsEntity;

  @CreateDateColumn()
  viewDate: Date;
}