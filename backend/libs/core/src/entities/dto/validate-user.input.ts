import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ValidateUserInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
