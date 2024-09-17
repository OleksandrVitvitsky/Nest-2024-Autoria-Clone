import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { AdsEntity } from "../../database/entities/ads.entity";

import { UserEntity } from '../../database/entities/user.entity';
import { RegisterReqDto } from '../auth/dto/req/register.req.dto';
import { AuthResDto } from '../auth/dto/res/auth.res.dto';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AuthService } from '../auth/services/auth.service';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { ContentType } from '../file-storage/enums/content-type.enum';
import { FileStorageService } from '../file-storage/services/file-storage.service';
import { AdsRepository } from "../repository/services/adsRepositoty";
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserRoleEnum } from './enum/role.enum';
import { UserAccountTypeEnum } from "./enum/user-account-type.enum";

@Injectable()
export class ManagerService {
  constructor(
    private readonly userRepository: UserRepository,
     private readonly adsRepository: AdsRepository,
     @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createManager(dto: RegisterReqDto): Promise<AuthResDto> {
    return await this.authService.register({
      ...dto,
      role: UserRoleEnum.MANAGER,
    });
  }

  public async updateUserStatus(
    id: string,
    isActive: boolean,
    currentUser: IUserData
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    user.isActive = isActive;
    return await this.userRepository.save(user);
  }

  public async updateAccountType(
    userId: string,
    accountType: UserAccountTypeEnum,
    userData: IUserData
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (accountType !== user.accountType) {
      user.accountType = accountType;
    }
    return await this.userRepository.save(user);
  }

  public async updateAdsStatus (adsId: string, isActive: boolean): Promise<AdsEntity> {
    const ads = await this.adsRepository.findOneBy({ id: adsId });
    if (!ads) {
      throw new NotFoundException('Ads not found');
    }
    if (isActive !== ads.isActive) {
      ads.isActive = isActive;
    }
    return await this.adsRepository.save(ads);
  }
}
