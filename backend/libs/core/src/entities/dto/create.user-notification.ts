import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreateUserNotificationInput extends CreateNotificationInput {
  @Field()
  userId: string;
}