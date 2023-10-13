import { Field, InputType } from '@nestjs/graphql';
import { RequestStatus } from '../enum/requestStatus';

@InputType()
export class UpdateRequestInput {
  @Field({ nullable: true })
  fileId?: string;

  @Field({ nullable: true })
  requestType?: string;

  @Field({ nullable: true })
  requestedUserId?: string;

  @Field({ nullable: true })
  requestedDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => RequestStatus, {
    nullable: true,
    defaultValue: RequestStatus.AWAITING_APPROVAL,
  })
  status: RequestStatus;
}
