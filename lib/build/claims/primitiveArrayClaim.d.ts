import { PrimitiveArrayClaim as PrimitiveArrayClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveArrayClaimConfig } from "supertokens-website/lib/build/claims/primitiveArrayClaim";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
export declare class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
