import { createUnionType } from '@nestjs/graphql';
import { LoginSuccess, RegisterNewUserSuccess, VerificationSuccess } from './success';
import { PasswordMismatchError } from './passwordMismatchError';
import { UserNotExistError } from './userNotExistError';

export const LoginResultUnion = createUnionType({
  name: 'LoginResultUnion',
  types: () => [LoginSuccess, PasswordMismatchError, UserNotExistError] as const,
});

export const RegisterResultUnion = createUnionType({
  name: 'RegisterResultUnion',
  types: () => [RegisterNewUserSuccess, PasswordMismatchError, UserNotExistError] as const,
});

export const VerificationResultUnion = createUnionType({
  name: 'VerificationResultUnion',
  types: () => [VerificationSuccess, PasswordMismatchError, UserNotExistError] as const,
});
