import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async signToken(payload) {
    try {
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_KEY,
      });
      return token;
    } catch (error) {
      throw new Error('Token generation failed.');
    }
  }

  private async verifyToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_KEY,
      });
      return payload;
    } catch (error) {
      throw new Error('Token verification failed.');
    }
  }

  private async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error('Hash password failed.');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    // find if user exist with this email
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  public async login(reqUser) {
    const payload = { email: reqUser.email, sub: reqUser.userId };
    return {
      access_token: await this.signToken(payload),
    };
  }

  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.usersService.create({ ...user, password: pass });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;

    // generate token
    const token = await this.signToken(result);

    // return the user and the token
    return { user: result, token };
  }

  public async logout(request: any, response) {
    const { session, logout } = request;
    await logout({ keepSessionInfo: false }, () => {
      session.destroy(() => {
        response.clearCookie('connect.sid');
      });
    });
  }
}
