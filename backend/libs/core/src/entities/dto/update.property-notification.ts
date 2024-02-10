import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdatePropertyNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  propertyId?: string;
}
