import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAlreadyExistsError {
  @Field({ defaultValue: "This user already exists!" })
  message: string;
}
