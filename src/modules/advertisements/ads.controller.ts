import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param, ParseUUIDPipe,
  Post,
  Put, UploadedFile,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse, ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { ApiFile } from "../../common/decorators/api-file.decorator";
import { AccountTypeGuard } from "../../common/guards/account.type.guard";
import { ProfanityValidatorGuard } from "../../common/guards/profanity.validator.guard";

import { RolesGuard } from '../../common/guards/roles.guard';
import { AdsMapper } from '../../common/mappers/ads.mapper';
import { UserMapper } from '../../common/mappers/user.mapper';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarsResDto } from '../cars/res/cars.res.dto';
import { AccountTypes, Roles } from "../users/decorators/roles.decorator";
import { UpdateUserStatusDto } from '../users/dto/req/update-user.status.req.dto';
import { UserResDto } from '../users/dto/res/user.res.dto';
import { UserRoleEnum } from '../users/enum/role.enum';
import { UserAccountTypeEnum } from "../users/enum/user-account-type.enum";
import { AdsService } from './ads.service';
import { BaseAdsReqDto } from './req/base-ads.req.dto';
import { AdViewsStatisticsDto } from "./res/ads-view.base.dto";
import { BaseAdsResDto } from './res/base-ads.res.dto';

@ApiBearerAuth()
@ApiTags('Advertisements')
@Controller('ads')
@UseGuards(RolesGuard)
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiOperation({
    summary: 'create a new ad (admin or manager or seller only)',
  })
  @UseGuards(ProfanityValidatorGuard)
  @Post('create')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.SELLER)
  public async createAd(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseAdsReqDto,
  ): Promise<BaseAdsResDto> {
    return await this.adsService.createAds(dto, userData);
  }

  @ApiOperation({ summary: 'Update an ad (admin or manager or seller only)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put(':id')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.SELLER)
  @UseGuards(ProfanityValidatorGuard)
  public async updateAd(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: BaseAdsReqDto,
  ): Promise<BaseAdsResDto> {
    const  ad = await this.adsService.updateAd(id, updateDto);
    return AdsMapper.toResponseDTO(ad);
  }

  @ApiOperation({ summary: 'Get all Ads (admin or manager only)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all ads',
    type: [BaseAdsResDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER)
  @Get('getAll')
  public async getAds(): Promise<BaseAdsResDto[]> {
    const adsList = await this.adsService.getAds();
    return AdsMapper.toResponseDtos(adsList);
  }
  @ApiOperation({ summary: 'Get statistics of ads views' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the ad views statistics',
    type: AdViewsStatisticsDto,
  })
  @ApiResponse({ status: 404, description: 'Ad not found' })
  @HttpCode(HttpStatus.OK)
 @UseGuards(AccountTypeGuard)
 @AccountTypes(UserAccountTypeEnum.PREMIUM)
  @Get(':id/views')
  public async getAdViewsStatistics(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AdViewsStatisticsDto> {
    return await this.adsService.getAdViewsStatistics(id);
  }





  @ApiOperation({ summary: 'Get ad by id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the ad',
    type: BaseAdsResDto,
  })
  @ApiNotFoundResponse({ description: 'Ad not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  public async getAdById(
    @Param('id', ParseUUIDPipe) id: string): Promise<BaseAdsResDto> {
    const ad = await this.adsService.getAdById(id);
    return AdsMapper.toResponseDTO(ad);
  }

  @ApiOperation({ summary: 'Get ads by user id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved  ads',
    type: BaseAdsResDto,
  })
  @ApiNotFoundResponse({ description: 'Ads not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, token missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, user does not have the required role',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('user/:userId')
  public async getAdsByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<BaseAdsResDto[]> {
    const adList = await this.adsService.getAdsByUserId(userId);
    return AdsMapper.toResponseDtos(adList);
  }

  @ApiOperation({ summary: 'Upload photo (admin or manager or seller only)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('photos',{limits:{files: 45}}))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.SELLER)
  @ApiFile('photos', true, false)
  @Post(':id/photos')
  public async uploadPhotos(
    @UploadedFile() photos: Express.Multer.File[],
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.adsService.uploadPhotos(id, photos);
  }


  @ApiOperation({ summary: 'Delete a specific photo (admin or manager or seller only)' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.SELLER)
  @Delete(':id/photos')
  public async deletePhoto(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('photoUrl') photoUrl: string,
  ): Promise<void> {
    await this.adsService.deletePhoto(id, photoUrl);
  }


  @ApiOperation({ summary: 'Delete all photos (admin or manager or seller only)' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.SELLER)
  @Delete(':id/photos/all')
  public async deleteAllPhotos(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.adsService.deleteAllPhotos(id);
  }


  @ApiOperation({ summary: 'delete ads  (admin or manager or seller only) ' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiNoContentResponse({ description: 'User has been removed' })
  //@UseGuards(BadWordsValidation, StatusAccountValidateGuard, CarValidationGuard)
  @Delete('/:id')
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.SELLER)
  public async deleteAds(  @Param('id', ParseUUIDPipe) id: string,): Promise<void> {
    await this.adsService.deleteAds(id);
  }
}
