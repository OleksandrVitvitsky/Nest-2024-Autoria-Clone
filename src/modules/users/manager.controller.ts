import { Body, Controller, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse, ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { RolesGuard } from '../../common/guards/roles.guard';
import { AdsMapper } from "../../common/mappers/ads.mapper";
import { UserMapper } from "../../common/mappers/user.mapper";
import { UpdateAdsStatusDto } from "../advertisements/req/update-ads.status.req.dto";
import { BaseAdsResDto } from "../advertisements/res/base-ads.res.dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { RegisterManagerReqDto } from '../auth/dto/req/register-manager.req.dto';
import { AuthResDto } from '../auth/dto/res/auth.res.dto';
import { IUserData } from "../auth/interfaces/user-data.interface";
import { Roles } from './decorators/roles.decorator';
import { UpdateUserDto } from "./dto/req/update-user.dto";
import { UpdateUserStatusDto } from "./dto/req/update-user.status.req.dto";
import { UserResDto } from "./dto/res/user.res.dto";
import { UserRoleEnum } from './enum/role.enum';
import { UserAccountTypeEnum } from "./enum/user-account-type.enum";
import { ManagerService } from './manager.service';


@ApiTags('Managers')
@Controller('managers')
@UseGuards(RolesGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiOperation({
    summary: 'Create manager(admin only)',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Post('create-manager')
  @Roles(UserRoleEnum.ADMIN)
  public async createManager(
    @Body() dto: RegisterManagerReqDto,
  ): Promise<AuthResDto> {
    return await this.managerService.createManager(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user status(admin or manager only)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put(':id/user-status')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  public async updateUserStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserStatusDto,
  ): Promise<UserResDto> {
    const updatedUser = await this.managerService.updateUserStatus(id, dto.isActive, userData);
    return UserMapper.toResponseDTO(updatedUser);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user account type (admin or manager only)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put(':id/user-account-type')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  public async updateAds(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: { accountType: UserAccountTypeEnum },
    @CurrentUser() userData: IUserData
  ): Promise<UserResDto> {
    const updatedUser = await this.managerService.updateAccountType(id, dto.accountType, userData);
    return UserMapper.toResponseDTO(updatedUser);
  }

  @ApiOperation({
    summary: 'Update ads status(admin or manager only)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put(':id/ads-status')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  public async updateAdsStatus(
    @Param('id', ParseUUIDPipe) id: string,
   // @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdsStatusDto,
  ): Promise<BaseAdsResDto> {
    const updatedAds = await this.managerService.updateAdsStatus(id, dto.isActive);
    return AdsMapper.toResponseDTO(updatedAds);
  }

}
