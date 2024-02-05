import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoreItemInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  sku?: string;

  @Field({ nullable: true })
  stock?: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  unit?: string;

  @Field({ nullable: true })
  price?: number;
}

@InputType()
export class CreateStoreItemsInput {
  @Field((type) => [CreateStoreItemInput])
  storeItems!: CreateStoreItemInput[];
}

