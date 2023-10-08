import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('logout')
  logout(@Request() req, res) {
    return this.authService.logout(req, res);
  }
}
