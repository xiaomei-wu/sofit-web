import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  async signup(@Body() user: CreateUserDto) {
    return this.authService.create(user);
  }

  @Post('logout')
  logout(@Request() req, res) {
    return this.authService.logout(req, res);
  }
}
