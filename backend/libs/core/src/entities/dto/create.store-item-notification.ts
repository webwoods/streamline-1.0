import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreateStoreItemNotificationInput extends CreateNotificationInput {
  @Field()
  storeItemId: string;
}