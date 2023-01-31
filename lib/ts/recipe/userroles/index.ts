import type { PrimitiveArrayClaim } from "supertokens-web-js/recipe/session";
import { PermissionClaim, UserRoleClaim } from "supertokens-web-js/recipe/userroles";

export default class UserRoleAPIWrapper {
    static PermissionClaim: PrimitiveArrayClaim<string> = PermissionClaim;
    static UserRoleClaim: PrimitiveArrayClaim<string> = UserRoleClaim;
}

export { PermissionClaim, UserRoleClaim };
