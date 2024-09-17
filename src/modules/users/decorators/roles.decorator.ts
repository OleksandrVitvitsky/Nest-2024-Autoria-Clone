import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from '../enum/role.enum';
import { UserAccountTypeEnum } from '../enum/user-account-type.enum';

export const Roles = (...roles: UserRoleEnum[]) =>
  SetMetadata('roles', roles);


export const AccountTypes = (...accountTypes: UserAccountTypeEnum[]) => SetMetadata('accountTypes', accountTypes);


// @UseGuards(AccountTypeGuard)
// @Roles(UserRoleEnum.ADMIN)
// @AccountTypes(UserAccountTypeEnum.PREMIUM)