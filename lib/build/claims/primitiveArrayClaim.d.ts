import { PrimitiveArrayClaim as PrimitiveArrayClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveArrayClaimConfig } from "supertokens-website/lib/build/claims/primitiveArrayClaim";
declare type ValidationCallback = (() => Promise<string | undefined>) | undefined;
export declare class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & {
            onSuccessRedirection?: ValidationCallback;
            onFailureRedirection?: ValidationCallback;
        }
    );
}
export {};
