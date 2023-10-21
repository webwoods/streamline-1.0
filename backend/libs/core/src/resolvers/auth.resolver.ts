import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../entities/dto/login.input';
import {
  LoginResultUnion,
  RegisterResultUnion,
  VerificationResultUnion,
} from '../entities/union/result.union';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserNotExistError } from '../entities/union/userNotExistError';
import { PasswordMismatchError } from '../entities/union/passwordMismatchError';
import {
  LoginSuccess,
  RegisterNewUserSuccess,
  VerificationSuccess,
} from '../entities/union/success';
import { VerifyUserInput } from '../entities/dto/verifyUser.input';
import { CreateUserInput } from '../entities/dto/create.user';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResultUnion)
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: { request: Request; response: Response },
  ): Promise<any> {
    try {
      const result = await this.authService.signIn(input);

      // Set the bearer token in the response header
      ctx?.response?.headers?.set(
        'Authorization',
        `Bearer ${result.access_token}`,
      );

      const success = new LoginSuccess(result.user, result.accessToken);
      return success;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new UserNotExistError();
      } else if (error instanceof ForbiddenException) {
        return new PasswordMismatchError();
      } else {
        throw new Error(error);
      }
    }
  }

  @Mutation(() => RegisterResultUnion)
  async registerNewUser(@Args('input') input: CreateUserInput): Promise<any> {
    try {
      const result = await this.authService.registerNewUser(input);
      const success = new RegisterNewUserSuccess(
        result.newUser,
        result.verificationToken,
      );
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
