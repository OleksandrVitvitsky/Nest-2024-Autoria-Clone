import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from '../enum/role.enum';


export const Roles = (...roles: UserRoleEnum[]) =>
  SetMetadata('roles', roles);
