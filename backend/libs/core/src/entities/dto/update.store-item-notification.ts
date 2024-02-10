import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdateStoreItemNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  storeItemId?: string;
}