import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/user.entity';

@ObjectType()
export class UsersWithCount {
  @Field()
  totalItems?: number;

  @Field(() => [User], { nullable: true })
  data?: User[];
}
