import { BooleanClaim as BooleanClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";
declare type ValidationCallback = (() => Promise<string | undefined>) | undefined;
export declare class BooleanClaim extends BooleanClaimWebJS {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccessRedirection?: ValidationCallback;
            onFailureRedirection?: ValidationCallback;
        }
    );
}
export {};
