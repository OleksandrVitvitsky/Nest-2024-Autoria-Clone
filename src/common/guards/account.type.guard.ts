import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IUserData } from '../../modules/auth/interfaces/user-data.interface';
import { UserAccountTypeEnum } from "../../modules/users/enum/user-account-type.enum";

@Injectable()
export class AccountTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAccountTypes = this.reflector.getAllAndOverride<UserAccountTypeEnum[]>(
      'accountType',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAccountTypes || requiredAccountTypes.length === 0) {
      // If no specific account type is required, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: IUserData = request.user;

    // Ensure user data is present
    if (!user || !user.accountType) {
      throw new ForbiddenException('User data is missing or invalid');
    }

    if (!requiredAccountTypes.includes(user.accountType)) {
      throw new ForbiddenException('You do not have permission (Account Type)');
    }

    return true;
  }
}
