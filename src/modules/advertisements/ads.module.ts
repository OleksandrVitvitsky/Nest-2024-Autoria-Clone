import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([AdEntity])],
  controllers: [AdsController],
  providers: [AdsService, AdsRepository],
  exports: [AdsService],
})
export class AdsModule {}
