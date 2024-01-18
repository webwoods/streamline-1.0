import { registerEnumType } from '@nestjs/graphql';

export enum RequestType {
  REQUEST = 'request',
  PURCHASE_ORDER = 'purchase order',
  QUOTATION = 'quotation'
}

registerEnumType(RequestType, {
  name: 'RequestType',
});
