import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { TokenBlacklistService } from './token-blacklist.service';
dotenv.config();

const authGlobalProviders = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenBlacklistService,
    LocalStrategy,
    JwtStrategy,
    ...authGlobalProviders,
  ],
  exports: [AuthService, TokenBlacklistService],
})
export class AuthModule {}
