import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemsInput {
  @Field({ nullable: true })
  requestId?: string;

  @Field({ nullable: true })
  storeItemId?: number;

  @Field({ nullable: true })
  qty?: number;
}
