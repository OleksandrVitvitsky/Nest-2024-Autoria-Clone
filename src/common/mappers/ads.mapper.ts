import { AdsEntity } from '../../database/entities/ads.entity';
import { CarEntity } from "../../database/entities/car.entity";
import { BaseAdsResDto } from '../../modules/advertisements/res/base-ads.res.dto';
import { CarsResDto } from "../../modules/cars/res/cars.res.dto";

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
      isActive: data.isActive,
      editQuantity: data.editQuantity,
      modelId: data.model.id,
      photos: data.photos,
      userId: data.user.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toResponseDtos(adsList: AdsEntity[]): BaseAdsResDto[] {
    return adsList.map(AdsMapper.toResponseDTO);
  }
}
