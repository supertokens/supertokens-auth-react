import { PrimitiveClaim as PrimitiveClaimWebJS } from "supertokens-web-js/recipe/session";
import type { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
import type { PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
export declare class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
