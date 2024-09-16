import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { carsDataItems } from '../../common/cars-data-items';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRoleEnum } from '../users/enum/role.enum';
import { CarsService } from './cars.service';
import { BrandReqDto } from './req/brand.req.dto';
import { CreateCarsReqDto } from './req/create-cars.req.dto';
import { ModelReqDto } from "./req/model.req.dto";
import { BrandResDto } from './res/brand.res.dto';
import { CarsResDto } from './res/cars.res.dto';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
@UseGuards(RolesGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create new models (role must be ADMIN)' })
  //@UseGuards(BadWordsValidation, StatusAccountValidateGuard, CarValidationGuard)
  @Post('create-cars')
  @ApiBody({ type: [CreateCarsReqDto] })
  @Roles(UserRoleEnum.ADMIN)
  public async createCars(
    @Body() dto: CreateCarsReqDto[],
  ): Promise<CarsResDto[]> {
    const dataToService = dto.length > 0 ? dto : carsDataItems;
    return await this.carsService.createCars(dataToService);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @Get('get-cars')
  public async getCars(): Promise<CarsResDto[]> {
    return await this.carsService.getCars();
  }
  @ApiOperation({ summary: 'Get car by id' })
  @Get('get-car/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async getCarById(@Param('id') id: string): Promise<CarsResDto> {
    return await this.carsService.getCarById(id);
  }
  @ApiOperation({ summary: 'Get brand with models by ID' })
  @Get('get-brand/:id')
  public async getBrandById(@Param('id') id: string): Promise<CarsResDto[]> {
    return await this.carsService.getBrandById(id);
  }
  @ApiOperation({ summary: 'Update brand by ID (role must be ADMIN)' })
  @Put('update-brand/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async updateBrand(
    @Param('id') id: string,
    @Body() dto: BrandReqDto,
  ): Promise<BrandResDto> {
    return await this.carsService.updateBrand(id, dto);
  }

  @ApiOperation({ summary: 'Delete brand by ID  (role must be ADMIN)' })
  @Roles(UserRoleEnum.ADMIN)
  @Delete('delete-brand/:id')
  public async deleteBrand(@Param('id') id: string): Promise<void> {
    await this.carsService.deleteBrand(id);
  }

  @ApiOperation({ summary: 'Add new model to a brand  (role must be ADMIN)' })
  @Post('add-model/:brandId')
  @Roles(UserRoleEnum.ADMIN)
  public async addModelToBrand(
    @Param('brandId') brandId: string,
    @Body() dto: ModelReqDto
  ): Promise<CarsResDto> {
    return await this.carsService.addModelToBrand(brandId, dto);
  }

  @ApiOperation({ summary: 'Update model by ID (role must be ADMIN)' })
  @Put('update-model/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async updateModel(
    @Param('id') id: string,
    @Body() dto: ModelReqDto
  ): Promise<CarsResDto> {
    return await this.carsService.updateModel(id, dto);
  }
  @ApiOperation({ summary: 'Delete model by ID (role must be ADMIN)' })
  @Delete('delete-model/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async deleteModel(@Param('id') id: string): Promise<void> {
    await this.carsService.deleteModel(id);
  }
}
