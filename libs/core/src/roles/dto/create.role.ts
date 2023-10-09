import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from '../enum/role';

@InputType()
export class CreateRoleInput {
  @Field(type => UserRoles)
  name!: UserRoles;

  @Field({ nullable: true })
  division?: string;
}

@InputType()
export class CreateRolesInput {
  @Field(type => [CreateRoleInput])
  roles!: CreateRoleInput[];
}