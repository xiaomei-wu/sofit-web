import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async verifyToken(token: string): Promise<any> {
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

  private async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
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

  public async login({ email, password }) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.uuid };
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

  public async getUser(userId) {
    const user = await this.usersService.findOneById(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, password, ...restData } = user;

    return { ...restData };
  }
}
