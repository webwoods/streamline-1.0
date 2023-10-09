import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasswordMismatchError {
  @Field({ defaultValue: 'Wrong Password!' })
  message: string;
}
