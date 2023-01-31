import { PrimitiveClaim as PrimitiveClaimWebJS, PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
export declare class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
