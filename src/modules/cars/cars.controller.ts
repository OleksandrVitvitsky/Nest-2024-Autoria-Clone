import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param, ParseUUIDPipe,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { carsDataItems } from '../../common/cars-data-items';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRoleEnum } from '../users/enum/role.enum';
import { CarsService } from './cars.service';
import { BrandReqDto } from './req/brand.req.dto';
import { CreateCarsReqDto } from './req/create-cars.req.dto';
import { ModelReqDto } from './req/model.req.dto';
import { BrandResDto } from './res/brand.res.dto';
import { CarsResDto } from './res/cars.res.dto';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
@UseGuards(RolesGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create new models (role must be ADMIN)' })
  @Post('create-cars')
  @ApiBody({ type: [CreateCarsReqDto] })
  @ApiResponse({
    status: 201,
    description: 'Successfully created new cars',
    type: [CarsResDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request, validation error' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Roles(UserRoleEnum.ADMIN)
  public async createCars(
    @Body() dto: CreateCarsReqDto[],
  ): Promise<CarsResDto[]> {
    const dataToService = dto.length > 0 ? dto : carsDataItems;
    return await this.carsService.createCars(dataToService);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all cars',
    type: [CarsResDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-cars')
  public async getCars(): Promise<CarsResDto[]> {
    return await this.carsService.getCars();
  }

  @ApiOperation({ summary: 'Get car by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the car',
    type: CarsResDto,
  })
  @ApiNotFoundResponse({ description: 'Car not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-car/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async getCarById(  @Param('id', ParseUUIDPipe) id: string): Promise<CarsResDto> {
    return await this.carsService.getCarById(id);
  }


  @ApiOperation({ summary: 'Get brand with models by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the brand with models',
    type: [CarsResDto],
  })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-brand/:id')
  public async getBrandById(@Param('id', ParseUUIDPipe) id: string): Promise<CarsResDto[]> {
    return await this.carsService.getBrandById(id);
  }

  @ApiOperation({ summary: 'Update brand by ID (role must be ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the brand',
    type: BrandResDto,
  })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 400, description: 'Bad request, validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-brand/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: BrandReqDto,
  ): Promise<BrandResDto> {
    return await this.carsService.updateBrand(id, dto);
  }

  @ApiOperation({ summary: 'Delete brand by ID  (role must be ADMIN)' })
  @Roles(UserRoleEnum.ADMIN)
  @ApiResponse({ status: 204, description: 'Successfully deleted the brand' })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete-brand/:id')
  public async deleteBrand(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.carsService.deleteBrand(id);
  }

  @ApiOperation({ summary: 'Add new model to a brand  (role must be ADMIN)' })
  @ApiResponse({
    status: 201,
    description: 'Successfully added a new model to the brand',
    type: CarsResDto,
  })
  @ApiNotFoundResponse({ description: 'Brand not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 400, description: 'Bad request, validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('add-model/:brandId')
  @Roles(UserRoleEnum.ADMIN)
  public async addModelToBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body() dto: ModelReqDto
  ): Promise<CarsResDto> {
    return await this.carsService.addModelToBrand(brandId, dto);
  }

  @ApiOperation({ summary: 'Update model by ID (role must be ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the model',
    type: CarsResDto,
  })
  @ApiNotFoundResponse({ description: 'Model not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 400, description: 'Bad request, validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-model/:id')
  @Roles(UserRoleEnum.ADMIN)
  public async updateModel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ModelReqDto,
  ): Promise<CarsResDto> {
    return await this.carsService.updateModel(id, dto);
  }
  @ApiOperation({ summary: 'Delete model by ID (role must be ADMIN)' })
  @ApiResponse({ status: 204, description: 'Successfully deleted the model' })
  @ApiNotFoundResponse({ description: 'Model not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete('delete-model/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRoleEnum.ADMIN)
  public async deleteModel(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.carsService.deleteModel(id);
  }
}
