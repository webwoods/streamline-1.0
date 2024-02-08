import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreatePropertyNotificationInput extends CreateNotificationInput {
  @Field()
  propertyId: string;
}
