import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestItemInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  typpe?: string;
}
