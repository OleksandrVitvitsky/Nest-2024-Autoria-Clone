import { UserRoleEnum } from '../../users/enum/role.enum';
import { UserAccountTypeEnum } from "../../users/enum/user-account-type.enum";

export interface IUserData {
  userId: string;
  deviceId: string;
  email: string;
  role: UserRoleEnum;
  accountType: UserAccountTypeEnum;
}
