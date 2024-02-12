import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType('NullableDataInput')
@ObjectType()
export class NullableData {
  @Field({ nullable: true })
  isNull?: boolean;
}