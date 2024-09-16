import { ModelEntity } from '../../database/entities/model.entity';
import { CarsResDto } from '../../modules/cars/res/cars.res.dto';

export class CarsMapper {
  static toResponseDto(model: ModelEntity): CarsResDto {
    return {
      id: model.id,
      name: model.name,
      brandId: model.brand.id,
      brandName: model.brand.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  static toResponseDtos(models: ModelEntity[]): CarsResDto[] {
    return models.map(CarsMapper.toResponseDto);
  }
}
