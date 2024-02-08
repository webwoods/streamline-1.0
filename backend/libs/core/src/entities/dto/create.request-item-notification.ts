import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreateRequestItemNotificationInput extends CreateNotificationInput {
  @Field()
  requestItemId: string;
}