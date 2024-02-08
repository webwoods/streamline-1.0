import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdateRequestitemNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  requestItemId?: string;
}