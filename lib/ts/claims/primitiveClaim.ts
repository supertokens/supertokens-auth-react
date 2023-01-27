import { PrimitiveClaim as PrimitiveClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";

type ValidationCallback = (() => Promise<string | undefined>) | undefined;

export class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
    constructor(config: PrimitiveClaimConfig & { onSuccess?: ValidationCallback; onFailure?: ValidationCallback }) {
        super(config);

        const validatorsWithCallbacks: { [key: string]: any } = { ...this.validators };

        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key as keyof PrimitiveClaimWebJS<T>["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return { ...validator(...args), onSuccess: config.onSuccess, onFailure: config.onFailure };
            };
        }

        this.validators = validatorsWithCallbacks as PrimitiveClaimWebJS<T>["validators"];
    }
}
