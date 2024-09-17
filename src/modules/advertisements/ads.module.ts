import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdsEntity } from '../../database/entities/ads.entity';
import { FileStorageModule } from "../file-storage/file-storage.module";
import { AdsRepository } from '../repository/services/adsRepositoty';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  imports: [ FileStorageModule,TypeOrmModule.forFeature([AdsEntity])],
  controllers: [AdsController],
  providers: [AdsService, AdsRepository],
  exports: [AdsService],
})
export class AdsModule {}
