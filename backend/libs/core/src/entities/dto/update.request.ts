import { Field, InputType } from '@nestjs/graphql';
import { RequestStatus } from '../enum/requestStatus';
import { RequestType } from '../enum/requestType';

@InputType()
export class UpdateRequestInput {
  @Field({ nullable: true })
  fileId?: string;

  @Field((type) => RequestType, {
    defaultValue: RequestType.REQUEST,
    nullable: true
  })
  requestType?: RequestType;
  
  @Field({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  requestedUserId?: string;

  @Field({ nullable: true })
  requestedDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => RequestStatus, {
    nullable: true,
    defaultValue: RequestStatus.PENDING,
  })
  status: RequestStatus;
}
