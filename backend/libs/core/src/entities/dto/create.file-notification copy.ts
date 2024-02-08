import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreateFileNotificationInput extends CreateNotificationInput {
  @Field()
  fileId: string;
}