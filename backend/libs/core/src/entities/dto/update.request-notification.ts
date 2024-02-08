import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdateRequestNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  requestId?: string;
}
