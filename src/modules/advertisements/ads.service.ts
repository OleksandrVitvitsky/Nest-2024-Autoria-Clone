import { Injectable } from '@nestjs/common';

import { AdsMapper } from '../../common/mappers/ads.mapper';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdsRepository } from '../repository/services/adsRepositoty';
import { BaseAdsReqDto } from './req/base-ads.req.dto';
import { BaseAdsResDto } from './res/base-ads.res.dto';

@Injectable()
export class AdsService {
  constructor(private readonly adsRepository: AdsRepository) {}
  public async createAds(
    dto: BaseAdsReqDto,
    userData: IUserData,
  ): Promise<BaseAdsResDto> {
    const ads = await this.adsRepository.save(
      this.adsRepository.create({
        ...dto,
        user: { id: userData.userId },
      }),
    );
    return AdsMapper.toResponseDTO(ads);
  }
}
