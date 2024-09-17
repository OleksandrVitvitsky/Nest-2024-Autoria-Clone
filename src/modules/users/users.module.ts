import { forwardRef, Module } from '@nestjs/common';
import { AdsModule } from "../advertisements/ads.module";

import { AuthModule } from '../auth/auth.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { ManagerController } from "./manager.controller";
import { ManagerService } from './manager.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => AuthModule), FileStorageModule,AdsModule],
  controllers: [UsersController,ManagerController],
  providers: [
    UsersService,
    ManagerService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  exports: [UsersService, ManagerService],
})
export class UsersModule {}
