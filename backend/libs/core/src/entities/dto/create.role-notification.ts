import { Field, InputType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create.notification';

@InputType()
export class CreateRoleNotificationInput extends CreateNotificationInput {
  @Field()
  roleId: string;
}