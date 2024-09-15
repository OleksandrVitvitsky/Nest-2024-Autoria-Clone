import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

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
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly fileStorageService: FileStorageService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async isEmailExistOrThrow(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && user.role !== UserRoleEnum.ADMIN) {
      throw new ConflictException('Email already exists');
    }
    return user;
  }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }
  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId });
    await this.authCacheService.deleteToken(userData.userId, userData.deviceId);
  }

  public async uploadAvatar(
    userData: IUserData,
    avatar: Express.Multer.File,
  ): Promise<void> {
    const image = await this.fileStorageService.uploadFile(
      avatar,
      ContentType.AVATAR,
      userData.userId,
    );
    await this.userRepository.update(userData.userId, { image });
  }

  public async deleteAvatar(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
      await this.userRepository.save(
        this.userRepository.merge(user, { image: null }),
      );
    }
  }
}
