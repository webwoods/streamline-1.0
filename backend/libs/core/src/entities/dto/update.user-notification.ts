import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdateUserNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  userId?: string;
}