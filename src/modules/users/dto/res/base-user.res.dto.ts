import { UserRoleEnum } from '../../enum/role.enum';
import { UserAccountTypeEnum } from '../../enum/user-account-type.enum';

export class BaseUserResDto {
  id: string;
  userName: string;
  email: string;
  image?: string;
  phone?: string;
  role: UserRoleEnum;
  accountType: UserAccountTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}
