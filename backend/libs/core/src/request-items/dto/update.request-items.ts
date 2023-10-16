import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestItemsInput {
  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  sku: string;

  @Field({ nullable: true })
  requestId: string;

  @Field({ nullable: true })
  name?: string;
}
