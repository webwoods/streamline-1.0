import { InputType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/models/role.entity';

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

  @Field({nullable: true})
  roleId?: string;
}
