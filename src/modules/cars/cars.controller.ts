import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { carsDataItems } from '../../common/cars-data-items';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRoleEnum } from '../users/enum/role.enum';
import { CarsService } from './cars.service';
import { CreateCarsReqDto } from './req/create-cars.req.dto';
import { CarsResDto } from './res/cars.res.dto';

@ApiBearerAuth()
@ApiTags('cars')
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
}
