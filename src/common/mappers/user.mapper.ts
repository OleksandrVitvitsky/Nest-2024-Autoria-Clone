import { ConfigStaticService } from '../../config/config-static';
import { UserEntity } from '../../database/entities/user.entity';
import { IJwtPayload } from '../../modules/auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../modules/auth/interfaces/user-data.interface';
import { UserResDto } from '../../modules/users/dto/res/user.res.dto';

export class UserMapper {
  public static toResponseDTO(data: UserEntity): UserResDto {
    const awsConfig = ConfigStaticService.get().aws;
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      image: data.image ? `${awsConfig.bucketUrl}/${data.image}` : null,
      phone: data.phone ? data.phone : null,
      accountType: data.accountType,
      role: data.role,
      dealer: data.dealer ? data.dealer.id : null,
      isActive: data.isActive,
    };
  }

  public static toIUserData(user: UserEntity, payload: IJwtPayload): IUserData {
    return {
      userId: payload.userId,
      deviceId: payload.deviceId,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
    };
  }
}
