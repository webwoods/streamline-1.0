import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePropertyInput {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;

  @Field({ nullable: true })
  type: string;
}
