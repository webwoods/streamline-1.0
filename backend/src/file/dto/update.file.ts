import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFileInput {
  @Field({ nullable: true })
  name?: string;
}
