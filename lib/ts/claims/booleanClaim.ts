import { BooleanClaim as BooleanClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";

type ValidationCallback = (() => Promise<string | undefined>) | undefined;

export class BooleanClaim extends BooleanClaimWebJS {
    public readonly onSuccess: ValidationCallback;
    public readonly onFailure: ValidationCallback;

    constructor(config: PrimitiveClaimConfig & { onSuccess?: ValidationCallback; onFailure?: ValidationCallback }) {
        super(config);

        this.onFailure = config.onFailure;
        this.onSuccess = config.onSuccess;
    }
}
