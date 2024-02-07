import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput {
  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  senderId?: string;
}
