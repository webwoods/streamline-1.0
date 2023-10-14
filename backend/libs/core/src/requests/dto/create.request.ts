import { Field, InputType } from '@nestjs/graphql';
import { RequestStatus } from '../enum/requestStatus';

@InputType()
export class CreateRequestInput {
  @Field({ nullable: true })
  fileId?: string;

  @Field()
  requestType: string;

  @Field()
  requestedUserId: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => RequestStatus, {
    defaultValue: RequestStatus.AWAITING_APPROVAL,
  })
  status: RequestStatus;
}
