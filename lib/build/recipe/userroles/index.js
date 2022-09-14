"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleClaim = exports.PermissionClaim = void 0;
var userroles_1 = require("supertokens-web-js/recipe/userroles");
Object.defineProperty(exports, "PermissionClaim", {
    enumerable: true,
    get: function () {
        return userroles_1.PermissionClaim;
    },
});
Object.defineProperty(exports, "UserRoleClaim", {
    enumerable: true,
    get: function () {
        return userroles_1.UserRoleClaim;
    },
});
var UserRoleAPIWrapper = /** @class */ (function () {
    function UserRoleAPIWrapper() {}
    UserRoleAPIWrapper.PermissionClaim = userroles_1.PermissionClaim;
    UserRoleAPIWrapper.UserRoleClaim = userroles_1.UserRoleClaim;
    return UserRoleAPIWrapper;
})();
exports.default = UserRoleAPIWrapper;
