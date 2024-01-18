import { Field, InputType } from '@nestjs/graphql';
import { RequestStatus } from '../enum/requestStatus';
import { RequestType } from '../enum/requestType';

@InputType()
export class CreateRequestInput {
  @Field({ nullable: true })
  fileId?: string;

  @Field((type) => RequestType, {
    defaultValue: RequestType.REQUEST,
  })
  requestType!: RequestType;

  @Field()
  requestedUserId!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  subject!: string;

  @Field((type) => RequestStatus, {
    defaultValue: RequestStatus.PENDING,
  })
  status: RequestStatus;
}
