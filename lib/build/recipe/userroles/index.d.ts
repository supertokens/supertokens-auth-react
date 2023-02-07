import { PermissionClaim, UserRoleClaim } from "supertokens-web-js/recipe/userroles";
import type { PrimitiveArrayClaim } from "supertokens-web-js/recipe/session";
export default class UserRoleAPIWrapper {
    static PermissionClaim: PrimitiveArrayClaim<string>;
    static UserRoleClaim: PrimitiveArrayClaim<string>;
}
export { PermissionClaim, UserRoleClaim };
