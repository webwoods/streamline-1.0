import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import {
  LoginResultUnion,
  RegisterResultUnion,
  VerificationResultUnion,
} from './union/result.union';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserNotExistError } from './union/userNotExistError';
import { PasswordMismatchError } from './union/passwordMismatchError';
import {
  LoginSuccess,
  RegisterNewUserSuccess,
  VerificationSuccess,
} from './union/success';
import { CreateUserInput } from 'src/users/dto/create.user';
import { VerifyUserInput } from './dto/verifyUser.input';
import { VerificationCodesService } from 'src/verification-codes/verification-codes.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationCodesService: VerificationCodesService,
  ) {}

  @Mutation(() => LoginResultUnion)
  async login(@Args('input') input: LoginInput): Promise<any> {
    try {
      const result = await this.authService.signIn(input);
      const success = new LoginSuccess(result.me, result.accessToken);
      return success;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new UserNotExistError();
      } else if (error instanceof ForbiddenException) {
        return new PasswordMismatchError();
      }
    }
  }

  @Mutation(() => RegisterResultUnion)
  async registerNewUser(@Args('input') input: CreateUserInput): Promise<any> {
    try {
      const result = await this.authService.registerNewUser(input);
      const success = new RegisterNewUserSuccess(result.newUser, result.verificationToken);
      return success;
    } catch (error) {
      // properly handle registration errors
      // currently a dummay error excepption is thrown
      // fix it
      return new Error(`Error registering user: ${error}`);
    }
  }

  @Mutation(() => VerificationResultUnion)
  async verifyUser(@Args('input') input: VerifyUserInput): Promise<any> {
    try {
      const success = new VerificationSuccess();
      success.me = await this.authService.verifyUser(input);
      return success;
    } catch (error) {
      // properly handle registration errors
      // currently a dummay error excepption is thrown
      // fix it
      return new Error(`Error verifying user: ${error}`);
    }
  }

  // implement a method to issue refresh tokens

  // implement a method to issue session tokens
}
