import { PrimitiveArrayClaim as PrimitiveArrayClaimWebJS } from "supertokens-web-js/recipe/session";
import type { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
import type { PrimitiveArrayClaimConfig } from "supertokens-web-js/recipe/session";
export declare class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
