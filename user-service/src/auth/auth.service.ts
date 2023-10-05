import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login.input';
import { VerificationCodesService } from '../verification-codes/verification-codes.service';
import { VerificationCode } from '../verification-codes/verification-codes.entity';
import { CreateUserInput } from '../users/dto/create.user';
import { VerifyUserInput } from './dto/verifyUser.input';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private verificationCodesService: VerificationCodesService,
    private jwtService: JwtService,
  ) {}

  async signIn(input: LoginInput): Promise<any> {
    const user = await this.userService.findUserByUsername(input.username);

    if (!user) {
      return new NotFoundException();
    }

    // check if the user's password are matching
    const match = bcrypt.compare(input.password, user.password);
    if (!match) {
      return new UnauthorizedException();
    }

    // remove the password from the return user object
    // to prevent it being exposed to public
    const { password, ...userWithoutPassword } = user;

    // return the user with the access token
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async registerNewUser(input: CreateUserInput): Promise<any> {
    if (!input) {
      return new NotFoundException();
    }

    // check if the current user data exists in the database
    const user = await this.userService.findUserByUsername(input.username);
    if (user && user.email === input.email) {
      throw new Error('This email has already been taken!');
    } else if (user) {
      throw new Error('This user already exists!');
    }

    const newUser = await this.userService.createUser(input);

    // Generate a verification token
    const verificationToken = await bcrypt.hash(
      `${input.username}${input.email}${Date.now()}`,
      10,
    );

    // add the new verification code to the user
    const result = await this.verificationCodesService.createVerificationCode(
      new VerificationCode(newUser, verificationToken),
    );

    if (!result) {
      return new NotFoundException();
    }

    // remove the password from the return new user object
    // to prevent it being exposed to public
    const savedUser = await this.userService.findUserById(newUser.id);
    const { password, ...userWithoutPassword } = savedUser;

    return {
      newUser: userWithoutPassword,
      verificationToken: verificationToken,
    };
  }

  async verifyUser(input: VerifyUserInput): Promise<any> {
    if (!input) {
      return new NotFoundException();
    }


    // check if the current user data exists in the database
    const user = await this.userService.findUserByUsername(input.username);
    if (!user) {
      throw new Error('User does not exist!');
    }
    // verification codes are sorted when the user is queried
    // the latest verification code for a particular user
    // can be obtained from the first verification code
    if (!user.verificationCodes) {
      throw new Error('No verification codes saved for this user!');
    }

    // check if verification codes match
    if (user.verificationCodes[0].code !== input.verificationToken) {
      throw new Error('Invalid verification code! Try again.');
    }

    user.verified = true;
    const verifiedUser = await this.userService.updateUser(user.id, user);
    return verifiedUser;
  }
}
