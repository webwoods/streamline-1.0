import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotificationRecieverInput {
  @Field()
  recieverId!: string;

  @Field()
  isRead!: boolean;

  @Field()
  notificationId!: string;
}

@InputType()
export class CreateNotificationRecieversInput {
  @Field(type => [CreateNotificationRecieverInput])
  recievers!: CreateNotificationRecieverInput[];
}