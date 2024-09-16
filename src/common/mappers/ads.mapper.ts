import { AdsEntity } from '../../database/entities/ads.entity';
import { BaseAdsResDto } from '../../modules/advertisements/res/base-ads.res.dto';

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
      //brand: data.brand,
      modelId: data.model.id,
      photos: data.photos,
      userId: data.user.id,
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
