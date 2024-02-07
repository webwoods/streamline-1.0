import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationRecieverInput {
  @Field({ nullable: true })
  recieverId?: string;

  @Field({ nullable: true })
  isRead?: boolean;

  @Field({ nullable: true })
  notificationId?: string;
}
