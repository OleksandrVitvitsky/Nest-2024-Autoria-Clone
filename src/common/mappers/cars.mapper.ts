import { CarEntity} from "../../database/entities/car.entity";
import { CarsResDto } from '../../modules/cars/res/cars.res.dto';

export class CarsMapper {
  public static toResponseDto(model: CarEntity): CarsResDto {
    return {
      id: model.id,
      name: model.name,
      brandId: model.brand.id,
      brandName: model.brand.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toResponseDtos(models: CarEntity[]): CarsResDto[] {
    return models.map(CarsMapper.toResponseDto);
  }
}
