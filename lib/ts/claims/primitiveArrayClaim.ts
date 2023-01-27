import { PrimitiveArrayClaim as PrimitiveArrayClaimWebJS } from "supertokens-web-js/recipe/session";
import { PrimitiveArrayClaimConfig } from "supertokens-website/lib/build/claims/primitiveArrayClaim";

type ValidationCallback = (() => Promise<string | undefined>) | undefined;

export class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & { onSuccess?: ValidationCallback; onFailure?: ValidationCallback }
    ) {
        super(config);

        const validatorsWithCallbacks: { [key: string]: any } = { ...this.validators };

        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key as keyof PrimitiveArrayClaimWebJS<T>["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return { ...validator(...args), onSuccess: config.onSuccess, onFailure: config.onFailure };
            };
        }

        this.validators = validatorsWithCallbacks as PrimitiveArrayClaimWebJS<T>["validators"];
    }
}
