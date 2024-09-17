import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../../common/guards/roles.guard";

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LoginReqDto } from './dto/req/login.req.dto';
import { RegisterReqDto } from './dto/req/register.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@ApiOperation({ summary: 'Register new user' })
  @SkipAuth()
  @Post('register')
  public async register(@Body() dto: RegisterReqDto): Promise<AuthResDto> {
    return await this.authService.register(dto);
  }
@ApiOperation({ summary: 'Login user' })
  @SkipAuth()
  @Post('login')
  public async signIn(@Body() dto: LoginReqDto): Promise<AuthResDto> {
    return await this.authService.login(dto);
  }
@ApiOperation({ summary: 'Get new access and refresh tokens' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @SkipAuth()
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }
@ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.signOut(userData);
  }
}
