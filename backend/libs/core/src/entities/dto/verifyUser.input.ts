import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class VerifyUserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  verificationToken: string;
}
