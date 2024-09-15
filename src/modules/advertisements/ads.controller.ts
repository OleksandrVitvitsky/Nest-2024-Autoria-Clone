import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdsService } from "./ads.service";
import { BaseAdsReqDto } from './req/base-ads.req.dto';
import { BaseAdsResDto } from './res/base-ads.res.dto';

@ApiBearerAuth()
@ApiTags('Advertisements')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiOperation({ summary: 'create a new ad' })
  //@UseGuards(BadWordsValidation, StatusAccountValidateGuard, CarValidationGuard)
  @Post('create ad')
  public async createAd(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseAdsReqDto,
  ): Promise<BaseAdsResDto> {
    return await this.adsService.createAds(dto, userData);
  }
}
