import { registerEnumType } from '@nestjs/graphql';

export enum RequestStatus {
  AWAITING_APPROVAL = 'awaiting approval',
  PROCESSING = 'processing',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

registerEnumType(RequestStatus, {
  name: 'RequestStatus',
});
