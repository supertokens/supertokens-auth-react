"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var userroles = require("supertokens-web-js/recipe/userroles");

var UserRoleAPIWrapper = /** @class */ (function () {
    function UserRoleAPIWrapper() {}
    UserRoleAPIWrapper.PermissionClaim = userroles.PermissionClaim;
    UserRoleAPIWrapper.UserRoleClaim = userroles.UserRoleClaim;
    return UserRoleAPIWrapper;
})();

Object.defineProperty(exports, "PermissionClaim", {
    enumerable: true,
    get: function () {
        return userroles.PermissionClaim;
    },
});
Object.defineProperty(exports, "UserRoleClaim", {
    enumerable: true,
    get: function () {
        return userroles.UserRoleClaim;
    },
});
exports.default = UserRoleAPIWrapper;
