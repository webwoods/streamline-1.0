import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemsInput {
  @Field({ nullable: true })
  type?: string;

  @Field()
  sku: string;

  @Field()
  requestId: string;

  @Field({ nullable: true })
  name?: string;
}
