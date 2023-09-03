import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

  private async generateToken(user) {
    try {
      const token = await this.jwtService.signAsync(user, {
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

  async validateUser(username: string, pass: string): Promise<any> {
    // find if user exist with this email
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.usersService.create({ ...user, password: pass });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;

    // generate token
    const token = await this.generateToken(result);

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
