import { BooleanClaim as BooleanClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";
declare type ValidationCallback = (() => Promise<string | undefined>) | undefined;
export declare class BooleanClaim extends BooleanClaimWebJS {
    readonly onSuccess: ValidationCallback;
    readonly onFailure: ValidationCallback;
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccess?: ValidationCallback;
            onFailure?: ValidationCallback;
        }
    );
}
export {};
