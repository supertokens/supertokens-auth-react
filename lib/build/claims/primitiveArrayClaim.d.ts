import {
    PrimitiveArrayClaim as PrimitiveArrayClaimWebJS,
    PrimitiveArrayClaimConfig,
} from "supertokens-web-js/recipe/session";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
export declare class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    );
}
