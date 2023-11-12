import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Request } from './request.entity';

/**
 * this 'User' class is an extension of the
 * 'User' class in the shared library.
 */
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Request], { nullable: true })
  requests?: Request[];
}
