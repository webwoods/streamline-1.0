import { ObjectType, Field} from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { User } from './user.entity';
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
}
