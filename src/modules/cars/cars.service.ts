import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CarsMapper } from '../../common/mappers/cars.mapper';
import { BrandEntity } from '../../database/entities/brand.entity';
import { CarEntity } from '../../database/entities/car.entity';
import {
  BrandRepository,
  CarRepository,
} from '../repository/services/carRepositoty';
import { BrandReqDto } from './req/brand.req.dto';
import { CreateCarsReqDto } from './req/create-cars.req.dto';
import { ModelReqDto } from "./req/model.req.dto";
import { BrandResDto } from './res/brand.res.dto';
import { CarsResDto } from './res/cars.res.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(CarEntity)
    private readonly carRepository: CarRepository,
  ) {}

  public async createCar(dto: CreateCarsReqDto): Promise<CarsResDto[]> {
    let brand = await this.brandRepository.findOne({
      where: { name: dto.name },
    });

    if (!brand) {
      brand = this.brandRepository.create({ name: dto.name });
      await this.brandRepository.save(brand);
    }

    const models: CarEntity[] = [];
    for (const model of dto.models) {
      let existingModel = await this.carRepository.findOne({
        where: { name: model.name, brand: { id: brand.id } },
        relations: ['brand'],
      });

      if (!existingModel) {
        existingModel = await this.carRepository.save(
          this.carRepository.create({
            name: model.name,
            brand: brand,
          }),
        );
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

  public async getCars(): Promise<CarsResDto[]> {
    const brands = await this.brandRepository.find({
      relations: ['models', 'models.brand'],
    });

    const result: CarsResDto[] = [];
    for (const brand of brands) {
      for (const model of brand.models) {
        result.push(CarsMapper.toResponseDto(model));
      }
    }
    return result;
  }
  public async getCarById(id: string): Promise<CarsResDto> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['brand'],
    });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return CarsMapper.toResponseDto(car);
  }

  public async getBrandById(id: string): Promise<CarsResDto[]> {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['models', 'models.brand'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return CarsMapper.toResponseDtos(brand.models);
  }

  public async updateBrand(id: string, dto: BrandReqDto): Promise<BrandResDto> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    brand.name = dto.name;
    await this.brandRepository.save(brand);
    return {
      id: brand.id,
      name: brand.name,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    };
  }
  public async deleteBrand(id: string): Promise<void> {
    const brand = await this.brandRepository.findOne({ where: { id }, relations: ['models'] });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    await this.brandRepository.remove(brand);
  }

  public async addModelToBrand(
    brandId: string,
    dto: ModelReqDto,
  ): Promise<CarsResDto> {
    const brand = await this.brandRepository.findOne({ where: { id: brandId } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    const newModel = this.carRepository.create({ name: dto.name, brand });
    await this.carRepository.save(newModel);

    return CarsMapper.toResponseDto(newModel);
  }

  public async updateModel(id: string, dto: ModelReqDto): Promise<CarsResDto> {
    const model = await this.carRepository.findOne({ where: { id }, relations: ['brand'] });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    model.name = dto.name;
    await this.carRepository.save(model);
    return CarsMapper.toResponseDto(model);
  }
  public async deleteModel(id: string): Promise<void> {
    const model = await this.carRepository.findOne({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    await this.carRepository.remove(model);
  }
}
