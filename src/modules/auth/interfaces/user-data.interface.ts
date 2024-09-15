import { UserRoleEnum } from '../../users/enum/role.enum';

export interface IUserData {
  userId: string;
  deviceId: string;
  email: string;
  role: UserRoleEnum;
}
