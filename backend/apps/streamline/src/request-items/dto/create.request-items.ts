import { Field, InputType } from '@nestjs/graphql';
import { Request } from '../../requests/request.entity';

@InputType()
export class CreateRequestItemsInput {

  @Field({ nullable: true })
  type?: string;

  @Field()
  skn: string;

  @Field()
  requestId: string;

  @Field({ nullable: true })
  name?: string;
}
