import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field({ nullable: true })
  roleId?: string;
}

@InputType()
export class CreateUsersInput {
  @Field((type) => [CreateUserInput])
  users!: CreateUserInput[];
}
