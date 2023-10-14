import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  key: string;

  @Field()
  value: string;

  @Field()
  type: string;
}
