import { registerEnumType } from "@nestjs/graphql";

export enum ProcurementUserType {
  REQUESTING_USER = 'requesting-user',
  APPROVING_USER = 'approving-user',
  REVIEWING_USER = 'reviewing-user',
}

registerEnumType(ProcurementUserType, {
  name: 'ProcurementUserType',
});