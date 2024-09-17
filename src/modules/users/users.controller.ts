import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserMapper } from '../../common/mappers/user.mapper';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RegisterManagerReqDto } from '../auth/dto/req/register-manager.req.dto';
import { AuthResDto } from '../auth/dto/res/auth.res.dto';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { Roles } from './decorators/roles.decorator';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UserRoleEnum } from './enum/role.enum';
import { ManagerService } from './manager.service';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Find me' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    const result = await this.usersService.findMe(userData);
    return UserMapper.toResponseDTO(result);
  }
  @ApiOperation({ summary: 'Update me' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResDto> {
    const result = await this.usersService.updateMe(userData, dto);
    return UserMapper.toResponseDTO(result);
  }
  @ApiOperation({ summary: 'Remove me' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiNoContentResponse({ description: 'User has been removed' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.removeMe(userData);
  }
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiFile('avatar', false, false)
  @Post('me/avatar')
  public async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, avatar);
  }
  @ApiOperation({ summary: 'Delete avatar' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }
}
