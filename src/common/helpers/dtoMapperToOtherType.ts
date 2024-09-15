import { SuperUser } from '../../config/config.type';
import { RegisterReqDto } from '../../modules/auth/dto/req/register.req.dto';
import { UserRoleEnum } from '../../modules/users/enum/role.enum';
import { UserAccountTypeEnum } from '../../modules/users/enum/user-account-type.enum';

export class DtoMapperToOtherType {
  public static ConfigTypeToRegisterReqDto(config: SuperUser): RegisterReqDto {
    return {
      userName: config.userName,
      email: config.email,
      password: config.password,
      phone: config.phone,
      deviceId: config.deviceId,
      role: UserRoleEnum[config.role as keyof typeof UserRoleEnum],
      accountType:
        UserAccountTypeEnum[
          config.accountType as keyof typeof UserAccountTypeEnum
        ],
    };
  }
}
