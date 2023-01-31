import { BooleanClaim as BooleanClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
export declare class BooleanClaim extends BooleanClaimWebJS {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
