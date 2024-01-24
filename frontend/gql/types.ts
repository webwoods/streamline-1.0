export interface User {
  email: string;
  id: string;
  name: string;
  username: string;
}

export enum RequestStatus {
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
