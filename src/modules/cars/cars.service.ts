import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CarsMapper } from '../../common/mappers/cars.mapper';
import { BrandEntity } from '../../database/entities/brand.entity';
import { ModelEntity } from '../../database/entities/model.entity';
import { BrandRepository } from '../repository/services/brandRepositoty';
import { ModelRepository } from '../repository/services/modelRepositoty';
import { CreateCarsReqDto } from './req/create-cars.req.dto';
import { CarsResDto } from './res/cars.res.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(ModelEntity)
    private readonly modelRepository: ModelRepository,
  ) {}

  public async createCar(dto: CreateCarsReqDto): Promise<any> {
    let brand = await this.brandRepository.findOne({
      where: { name: dto.name },
    });

    if (!brand) {
      brand = this.brandRepository.create({ name: dto.name });
      await this.brandRepository.save(brand);
    }

    const models: ModelEntity[] = [];
    for (const model of dto.models) {
      let existingModel = await this.modelRepository.findOne({
        where: { name: model.name, brand: { id: brand.id } },
        relations: ['brand'],
      });

      if (!existingModel) {
        const newModel = this.modelRepository.create({
          name: model.name,
          brand: brand,
        });
        existingModel = await this.modelRepository.save(newModel);
      }
      models.push(existingModel);
    }
    return CarsMapper.toResponseDtos(models);
  }

  public async createCars(dto: CreateCarsReqDto[]): Promise<CarsResDto[]> {
    const result: CarsResDto[] = [];
    for (const item of dto) {
      const car = await this.createCar(item);
      result.push(...car);
    }
    return result;
  }
}
