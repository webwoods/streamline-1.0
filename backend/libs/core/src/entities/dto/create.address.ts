import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field({ nullable: true })
  houseNumber?: string;

  @Field({ nullable: true })
  addressLine1?: string;

  @Field({ nullable: true })
  addressLine2?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  postalCode?: string;
}
