import { PrimitiveClaim as PrimitiveClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";
declare type ValidationCallback = (() => Promise<string | undefined>) | undefined;
export declare class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccess?: ValidationCallback;
            onFailure?: ValidationCallback;
        }
    );
}
export {};
