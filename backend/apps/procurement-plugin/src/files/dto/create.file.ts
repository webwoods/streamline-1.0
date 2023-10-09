import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field({ nullable: true })
  name?: string;
}
