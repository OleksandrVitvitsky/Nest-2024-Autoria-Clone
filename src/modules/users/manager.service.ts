import { ConflictException, forwardRef, Inject, Injectable } from "@nestjs/common";

import { UserEntity } from '../../database/entities/user.entity';
import { RegisterReqDto } from '../auth/dto/req/register.req.dto';
import { AuthResDto } from '../auth/dto/res/auth.res.dto';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AuthService } from '../auth/services/auth.service';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { ContentType } from '../file-storage/enums/content-type.enum';
import { FileStorageService } from '../file-storage/services/file-storage.service';
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserRoleEnum } from './enum/role.enum';

@Injectable()
export class ManagerService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly authCacheService: AuthCacheService,
    // private readonly fileStorageService: FileStorageService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createManager(dto: RegisterReqDto): Promise<AuthResDto> {
    return await this.authService.register({
      ...dto,
      role: UserRoleEnum.MANAGER,
    });
  }

}
