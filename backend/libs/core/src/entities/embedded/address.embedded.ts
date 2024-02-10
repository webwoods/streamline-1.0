import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export class Address {
  @Column({ nullable: true, name: 'house_number' })
  @Field({ nullable: true, name: 'houseNumber' })
  houseNumber?: string;

  @Column({ nullable: true, name: 'address_line1' })
  @Field({ nullable: true, name: 'addressLine1' })
  addressLine1?: string;

  @Column({ nullable: true, name: 'address_line2' })
  @Field({ nullable: true, name: 'addressLine2' })
  addressLine2?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  state?: string;

  @Column({ nullable: true, name: 'postal_code' })
  @Field({ nullable: true, name: 'postalCode' })
  postalCode?: string;
}