import { registerEnumType } from "@nestjs/graphql";

export enum UserRoles {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  DIRECTOR = 'director',
  PROCUREMENT_STAFF = 'procurement-staff',
  EMPLOYEE = 'employee',
  STORE_STAFF = 'store-staff',
  HOD = 'hod',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});