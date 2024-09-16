import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/roles.guard';
import { ModelsService } from './models.service';

@ApiBearerAuth()
@ApiTags('Models')
@Controller('models')
@UseGuards(RolesGuard)
export class ModelsController {
  constructor(private readonly modelService: ModelsService) {}

  // @ApiOperation({ summary: 'create a new model' })
  // //@UseGuards(BadWordsValidation, StatusAccountValidateGuard, CarValidationGuard)
  // @Post('create')
  // @Roles(UserRoleEnum.ADMIN)
  // public async createModel(@Body() dto: ModelReqDto): Promise<ModelResDto> {
  //   return await this.modelService.createModel(dto);
  // }
}
