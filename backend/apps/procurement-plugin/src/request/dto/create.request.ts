import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestInput {
  @Field({ nullable: true })
  fileId?: string;

  @Field()
  requestType: string;

  @Field()
  requestedUserId: string;

  @Field({ nullable: true })
  description?: string;
}