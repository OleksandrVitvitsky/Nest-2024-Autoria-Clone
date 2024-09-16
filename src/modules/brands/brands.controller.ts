import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/roles.guard';
import { BrandsService } from './brands.service';

@ApiBearerAuth()
@ApiTags('Models')
@Controller('models')
@UseGuards(RolesGuard)
export class BrandsController {
  constructor(private readonly modelService: BrandsService) {}

  // @ApiOperation({ summary: 'create a new model' })
  // //@UseGuards(BadWordsValidation, StatusAccountValidateGuard, CarValidationGuard)
  // @Post('create')
  // @Roles(UserRoleEnum.ADMIN)
  // public async createModel(@Body() dto: ModelReqDto): Promise<ModelResDto> {
  //   return await this.modelService.createModel(dto);
  // }
}
