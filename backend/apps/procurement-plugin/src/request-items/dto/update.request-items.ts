import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestItemsInput {

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  skn: string;

  @Field({ nullable: true })
  request: Request;

  @Field({ nullable: true })
  name?: string;
}
