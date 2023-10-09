import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from 'src/roles/enum/role';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  roleId?: string;
}

@InputType()
export class CreateUsersInput {
  @Field((type) => [CreateUserInput])
  users: CreateUserInput[];
}
