import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Request } from '../requests/request.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => [Request])
  requests?: Request[];
}