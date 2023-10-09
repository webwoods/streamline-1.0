import { registerEnumType } from "@nestjs/graphql";

export enum UserRoles {
  ADMIN = 'admin',
  DIRECTOR = 'director',
  PROCUREMENT_STAFF = 'procurement-staff',
  EMPLOYEE = 'employee',
  STORE_STAFF = 'store-staff',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});