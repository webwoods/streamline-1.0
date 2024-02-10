import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  message!: string;

  @Field()
  senderId!: string;
}
