import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DealerRepositoty } from "../../repository/services/dealerRepositoty";

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserRoleEnum } from '../../users/enum/role.enum';
import { UserMapper } from '../../../common/mappers/user.mapper';
import { UsersService } from '../../users/users.service';
import { LoginReqDto } from '../dto/req/login.req.dto';
import { RegisterReqDto } from '../dto/req/register.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly dealerRepository: DealerRepositoty,
  ) {}

  async regenerateTokens(userData: IUserData): Promise<TokenPairResDto> {
    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });

    await Promise.all([
      this.refreshTokenRepository.delete({
        deviceId: userData.deviceId,
        user_id: userData.userId,
      }),
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    ]);

    await Promise.all([
      this.refreshTokenRepository.save({
        deviceId: userData.deviceId,
        refreshToken: tokens.refreshToken,
        user_id: userData.userId,
      }),
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.deviceId,
      ),
    ]);
    return tokens;
  }

  public async register(dto: RegisterReqDto): Promise<AuthResDto> {
    const user_found = await this.userService.isEmailExistOrThrow(dto.email);
    if (user_found?.role === UserRoleEnum.ADMIN) {
      return;
    }
    const password = await bcrypt.hash(dto.password, 7);
    let dealer = null;
    if (dto.dealer) {
      // Знайти автосалон за його ID
      dealer = await this.dealerRepository.findOne({ where: { id: dto.dealer } });
      if (!dealer) {
        throw new Error('Dealer not found');
      }
    }

    const user = await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password,
        dealer, // Передати об'єкт автосалону
      }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshTokenRepository.save({
        deviceId: dto.deviceId,
        refreshToken: tokens.refreshToken,
        user_id: user.id,
      }),
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
    ]);
    return { user: UserMapper.toResponseDTO(user), tokens };
  }

  public async login(dto: LoginReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const tokens = await this.regenerateTokens({
      deviceId: dto.deviceId,
      userId: user.id,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
    });
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    return { user: UserMapper.toResponseDTO(userEntity), tokens };
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    return await this.regenerateTokens(userData);
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.refreshTokenRepository.delete({
        deviceId: userData.deviceId,
        user_id: userData.userId,
      }),
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    ]);
  }
}
