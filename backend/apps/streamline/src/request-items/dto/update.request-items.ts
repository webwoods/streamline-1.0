import { Field, InputType } from '@nestjs/graphql';
import { Request } from '../../requests/request.entity';

@InputType()
export class UpdateRequestItemsInput {

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  skn: string;

  @Field({ nullable: true })
  requestId: string;

  @Field({ nullable: true })
  name?: string;
}
