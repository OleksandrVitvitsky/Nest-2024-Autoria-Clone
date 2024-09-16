import { Column, Entity, OneToMany } from 'typeorm';

import { UserRoleEnum } from '../../modules/users/enum/role.enum';
import { UserAccountTypeEnum } from '../../modules/users/enum/user-account-type.enum';
import { AdsEntity } from './ads.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @Column('text')
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  phone?: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: UserAccountTypeEnum,
    default: UserAccountTypeEnum.BASIC,
  })
  accountType: UserAccountTypeEnum;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AdsEntity, (ads) => ads.user)
  ads: AdsEntity[];

  //
  //TODO
  // @Column({ type: 'boolean', default: false })
  // block: boolean;
  //TODO
  // @OneToMany(() => CarEntity, (entity) => entity.user)
  // cars: CarEntity[];
}
