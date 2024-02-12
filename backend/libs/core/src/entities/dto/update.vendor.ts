import { Field, InputType } from '@nestjs/graphql';
import { Address } from '../embedded/address.embedded';
import { Region } from '../enum/region';
import { UpdateAddressInput } from './update.address';

@InputType()
export class UpdateVendorInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  group?: string;

  @Field(() => UpdateAddressInput, { nullable: true })
  address?: Address;

  @Field(() => Region, { nullable: true })
  region?: Region;
}
