import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemInput {
  @Field()
  requestId: string;

  @Field()
  storeItemId: string;

  @Field({ nullable: true })
  qty?: number;
}

@InputType()
export class CreateRequestItemsInput {
  @Field((type) => [CreateRequestItemInput])
  requestItems!: CreateRequestItemInput[];
}
