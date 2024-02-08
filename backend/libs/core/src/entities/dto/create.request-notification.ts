import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreateRequestNotificationInput extends CreateNotificationInput {
  @Field()
  requestId: string;
}
