import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, Token } from 'src/modules/user/dto/create-user.dto';
import { JWTResponse, UserEntity } from '../user/entities/user.entity';
import { User } from '../user/user.decorator';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { TokenBlacklistService } from './token-blacklist.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() user: CreateUserDto) {
    return await this.authService.login(user);
  }

  @Public()
  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  async signup(@Body() user: CreateUserDto) {
    return this.authService.create(user);
  }

  @Post('verifyToken')
  @ApiCreatedResponse({ type: JWTResponse })
  async verifyToken(@Body() token: Token) {
    return this.authService.verifyToken(token.accessToken);
  }

  @Post('logout')
  async logout(@Req() request): Promise<void> {
    const token = request.headers.authorization.split(' ')[1]; // Assuming token is in the "Authorization" header
    return this.tokenBlacklistService.addToBlacklist(token);
  }

  @Get('me')
  async getMe(@User() userId) {
    return this.authService.getUser(userId);
  }
}
