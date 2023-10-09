import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from 'src/roles/enum/role';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  roleId?: string;
}
