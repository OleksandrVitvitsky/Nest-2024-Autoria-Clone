import { UserRoleEnum } from '../../modules/users/enum/role.enum';
import { UserAccountTypeEnum } from '../../modules/users/enum/user-account-type.enum';

export const administratorDto = {
  userName: 'admin',
  email: 'admin@admin.com',
  phone: '0999999999',
  role: UserRoleEnum.ADMIN,
  password: 'admin',
  accountType: UserAccountTypeEnum.PREMIUM,
  deviceId: '',
};
