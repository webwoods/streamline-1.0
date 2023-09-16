import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemInput {
  @Field()
  name: string;

  @Field()
  type: string;
}
