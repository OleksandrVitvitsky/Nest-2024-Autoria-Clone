import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../config/configuration';
import { AdsModule } from './advertisements/ads.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { DealersModule } from "./dealers/dealers.module";
import { FileStorageModule } from './file-storage/file-storage.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    RepositoryModule,
    RedisModule,
    PostgresModule,
    FileStorageModule,
    AdsModule,
    CarsModule,
    DealersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
