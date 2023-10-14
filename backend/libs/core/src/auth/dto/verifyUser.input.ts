import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class VerifyUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  verificationToken: string;
}
