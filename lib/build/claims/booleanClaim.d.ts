import { BooleanClaim as BooleanClaimWebJS, PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
export declare class BooleanClaim extends BooleanClaimWebJS {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
