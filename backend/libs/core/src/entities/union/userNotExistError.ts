import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserNotExistError {
  @Field({ defaultValue: "This user doesn't exist!" })
  message: string;
}
