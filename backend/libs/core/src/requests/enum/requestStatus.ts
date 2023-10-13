import { registerEnumType } from '@nestjs/graphql';

export enum RequestStatus {
  AWAITING_APPROVAL = 'awaiting approval',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

registerEnumType(RequestStatus, {
  name: 'RequestStatus',
});
