import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdateFileNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  fileId?: string;
}