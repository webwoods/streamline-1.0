import { Field, InputType } from '@nestjs/graphql';
import { UpdateNotificationInput } from './update.notification';

@InputType()
export class UpdateRoleNotificationInput extends UpdateNotificationInput {
  @Field({ nullable: true })
  roleId?: string;
}