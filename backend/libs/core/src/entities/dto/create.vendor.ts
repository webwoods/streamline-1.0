import { Field, InputType } from '@nestjs/graphql';
import { Address } from '../embedded/address.embedded';
import { Region } from '../enum/region';
import { CreateAddressInput } from './create.address';

@InputType()
export class CreateVendorInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;

  @Field({ nullable: true })
  group?: string;

  @Field(() => CreateAddressInput, { nullable: true })
  address?: Address;

  @Field(() => Region)
  region!: Region;
}
