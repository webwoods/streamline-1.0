import { ObjectType, Field} from '@nestjs/graphql';
import { Request } from '../requests/request.entity';
import { Entity, OneToMany} from 'typeorm';
import { User } from '@libs/core/users/user.entity';

/**
 * this 'User' class is an extension of the
 * 'User' class in the shared library.
 */

@Entity()
@ObjectType()
export class ProcurementUser extends User {
  @OneToMany(() => Request, (request) => request.requestedUser)
  requests?: Request[];
}
