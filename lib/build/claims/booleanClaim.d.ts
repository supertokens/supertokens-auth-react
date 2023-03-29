import { BooleanClaim as BooleanClaimWebJS } from "supertokens-web-js/recipe/session";
import type { ValidationFailureCallback } from "../types";
import type { PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
export declare class BooleanClaim extends BooleanClaimWebJS {
    constructor(
        config: PrimitiveClaimConfig & {
            onFailureRedirection?: ValidationFailureCallback;
            showAccessDeniedOnFailure?: boolean;
        }
    );
}
