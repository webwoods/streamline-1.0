"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
var graphql_1 = require("@nestjs/graphql");
var UserRoles;
(function (UserRoles) {
    UserRoles["SUPERADMIN"] = "superadmin";
    UserRoles["ADMIN"] = "admin";
    UserRoles["DIRECTOR"] = "director";
    UserRoles["PROCUREMENT_STAFF"] = "procurement-staff";
    UserRoles["EMPLOYEE"] = "employee";
    UserRoles["STORE_STAFF"] = "store-staff";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
(0, graphql_1.registerEnumType)(UserRoles, {
    name: 'UserRoles',
});
