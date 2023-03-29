import { PrimitiveArrayClaim as PrimitiveArrayClaimWebJS } from "supertokens-web-js/recipe/session";
import type { ValidationFailureCallback } from "../types";
import type { PrimitiveArrayClaimConfig } from "supertokens-web-js/recipe/session";
export declare class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & {
            onFailureRedirection?: ValidationFailureCallback;
            showAccessDeniedOnFailure?: boolean;
        }
    );
}
