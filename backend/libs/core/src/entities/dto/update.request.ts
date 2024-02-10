import { Field, InputType } from '@nestjs/graphql';
import { RequestStatus } from '../enum/requestStatus';
import { RequestType } from '../enum/requestType';

@InputType()
export class UpdateRequestInput {
  @Field({ nullable: true })
  fileId?: string;

  @Field((type) => RequestType, { nullable: true })
  requestType?: RequestType;

  @Field({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  requestedUserId?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => RequestStatus, { nullable: true })
  status: RequestStatus;

  @Field({ nullable: true })
  subtotal?: number;

  @Field({ nullable: true })
  tax?: number;

  @Field({ nullable: true })
  total?: number;

  @Field({ nullable: true })
  expectedAt?: Date;

  @Field(() => [String], { nullable: true })
  forwardTo?: string[];
}
