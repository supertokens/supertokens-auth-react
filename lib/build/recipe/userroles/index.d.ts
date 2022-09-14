import { PrimitiveArrayClaim } from "supertokens-web-js/recipe/session";
import { PermissionClaim, UserRoleClaim } from "supertokens-web-js/recipe/userroles";
export default class UserRoleAPIWrapper {
    static PermissionClaim: PrimitiveArrayClaim<string>;
    static UserRoleClaim: PrimitiveArrayClaim<string>;
}
export { PermissionClaim, UserRoleClaim };
