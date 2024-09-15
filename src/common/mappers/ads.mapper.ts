import { ConfigStaticService } from '../../config/config-static';
import { UserEntity } from '../../database/entities/user.entity';
import { BaseAdsResDto } from '../../modules/advertisements/res/base-ads.res.dto';
import { IJwtPayload } from '../../modules/auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../modules/auth/interfaces/user-data.interface';
import { UserResDto } from '../../modules/users/dto/res/user.res.dto';

export class AdsMapper {
  public static toResponseDTO(data: AdsEntity): BaseAdsResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      location: data.location,
      condition: data.condition,
      year: data.year,
      mileage: data.mileage,
      brand: data.brand,
      model: data.model,
      photos: data.photos,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  // public static toIUserData(user: UserEntity, payload: IJwtPayload): IUserData {
  //   return {
  //     userId: payload.userId,
  //     deviceId: payload.deviceId,
  //     email: user.email,
  //     role: user.role,
  //   };
  // }
}
