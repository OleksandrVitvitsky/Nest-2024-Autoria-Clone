import { Global, Module } from '@nestjs/common';

import { AdsRepository } from './services/adsRepositoty';
import { AdViewRepository } from "./services/adsViewRepositoty";
import { BrandRepository, CarRepository } from './services/carRepositoty';
import { DealerRepositoty } from "./services/dealerRepositoty";
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  AdsRepository,
  CarRepository,
  BrandRepository,
  DealerRepositoty,
  AdViewRepository
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
