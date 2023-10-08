import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemsInput {

  @Field({ nullable: true })
  type?: string;

  @Field()
  skn: string;

  @Field()
  request: Request;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  properties?: string;
}
