import { ObjectType, Field} from '@nestjs/graphql';
import { Request } from '../requests/request.entity';
import { Entity, OneToMany} from 'typeorm';
import { User } from '@libs/core/users/user.entity';
import { ProcurementUserType } from './enum/procurement-user-type';

/**
 * this 'User' class is an extension of the
 * 'User' class in the shared library.
 */

@Entity()
@ObjectType()
export class ProcurementUser extends User {
  @Field(() => ProcurementUserType)
  type: ProcurementUserType;

  @OneToMany(() => Request, (request) => request.requestedUser)
  requests?: Request[];
}
