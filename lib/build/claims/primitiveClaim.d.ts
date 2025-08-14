import { PrimitiveClaim as PrimitiveClaimWebJS } from "supertokens-web-js/recipe/session";
import type { ValidationFailureCallback } from "../types";
import type { PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
export declare class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
    constructor(
        config: PrimitiveClaimConfig & {
            onFailureRedirection?: ValidationFailureCallback;
            showAccessDeniedOnFailure?: boolean;
        }
    );
}
