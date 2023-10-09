import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from '../enum/role';

@InputType()
export class UpdateRoleInput {
  @Field(type => UserRoles)
  name: UserRoles;

  @Field({ nullable: true })
  division?: string;
}
