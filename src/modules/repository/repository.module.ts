import { Global, Module } from '@nestjs/common';

import { AdsRepository } from './services/adsRepositoty';
import { BrandRepository } from './services/brandRepositoty';
import { ModelRepository } from './services/modelRepositoty';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  AdsRepository,
  ModelRepository,
  BrandRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
