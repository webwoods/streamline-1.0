import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginInput } from '../entities/dto/login.input';
import {
  VerifyPasswordInput,
  VerifyUserInput,
} from '../entities/dto/verify-user.input';
import { UserService } from '@libs/core/services/user.service';
import { VerificationCodesService } from '@libs/core/services/verification-codes.service';
import { CreateUserInput } from '@libs/core/entities/dto/create.user';
import { MailService } from './mail.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private verificationCodesService: VerificationCodesService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async signIn(input: LoginInput): Promise<any> {
    let user: Partial<User>;

    if (this.isValidEmail(input.username)) {
      user = await this.userService.findUserByEmail(input.username);
    } else {
      user = await this.userService.findUserByUsername(input.username);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // check if the user's password are matching
    const match = bcrypt.compare(input.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid password');
    }

    // remove the password from the return user object
    // to prevent it being exposed to public
    const {
      password,
      verificationCodes,
      createdAt,
      updatedAt,
      roleId,
      ...userWithoutPassword
    } = user;

    // return the user with the access token
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async registerNewUser(input: CreateUserInput): Promise<any> {
    if (!input) {
      throw new BadRequestException('Invalid input data');
    }

    // check if the current user data exists in the database
    const email: string | undefined = input.email;

    if (email === undefined) {
      throw new NotFoundException();
    }
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      throw new ConflictException('This email has already been taken!');
    }

    const newUser = await this.userService.createUser(input);

    if (newUser === null) {
      throw new ConflictException('User creation failed');
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Set expiration time (5 minutes from now)
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 5);

    // Store the verification code and expiration date
    await this.verificationCodesService.createVerificationCode({
      user: newUser,
      code: verificationCode,
      expirationDate: expirationDate,
    });

    // Send the verification code to the user via email
    const subject = 'Verification Code';
    const text = `Your verification code is: ${verificationCode}`;
    await this.mailService.sendMail(newUser.email, subject, text);

    // Remove the password from the return new user object
    const savedUser = await this.userService.findUserById(newUser.id);

    if (savedUser === null) {
      throw new NotFoundException();
    }

    const {
      password,
      verificationCodes,
      createdAt,
      updatedAt,
      ...userWithoutPassword
    } = savedUser;

    return {
      newUser: userWithoutPassword,
      verificationCode: verificationCode,
    };
  }

  async verifyUser(input: VerifyUserInput): Promise<any> {
    if (!input) {
      throw new NotFoundException('Invalid input data');
    }

    // check if the current user data exists in the database
    let user: Partial<User>;

    if (input.username) {
      user = await this.userService.findUserByUsername(input.username);
    } else if (input.email) {
      user = await this.userService.findUserByEmail(input.email);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // verification codes are sorted when the user is queried
    // the latest verification code for a particular user
    // can be obtained from the first verification code
    if (!user.verificationCodes) {
      throw new NotFoundException('Verification codes not found');
    }

    // check if verification codes match
    if (user.verificationCodes[0].code !== input.verificationToken) {
      throw new BadRequestException('Invalid verification code! Try again.');
    }

    user.verified = true;
    const verifiedUser = await this.userService.updateUser(user.id, user);
    const { password, ...result } = verifiedUser;
    return result;
  }

  async verifyPassword(input: VerifyPasswordInput): Promise<boolean> {
    if (!input) {
      throw new NotFoundException('Invalid input data');
    }

    // check if the current user data exists in the database
    let user: Partial<User>;

    if (input.username) {
      user = await this.userService.findUserByUsername(input.username);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // check if the user's password are matching
    const match = bcrypt.compare(input.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid password');
    }

    // remove the password from the return user object
    // to prevent it being exposed to public
    // const {
    //   password,
    //   verificationCodes,
    //   createdAt,
    //   updatedAt,
    //   roleId,
    //   ...userWithoutPassword
    // } = user;

    return true;
  }
}
