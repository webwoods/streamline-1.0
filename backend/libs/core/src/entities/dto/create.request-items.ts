import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestItemsInput {
  @Field({ nullable: true })
  type?: string;

  @Field()
  sku: string;

  @Field()
  unit: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  quantity?: number;
}
