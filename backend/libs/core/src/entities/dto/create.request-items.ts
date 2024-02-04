import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemsInput {
  @Field()
  requestId: string;

  @Field()
  storeItemId: string;

  @Field({ nullable: true })
  qty?: number;
}
