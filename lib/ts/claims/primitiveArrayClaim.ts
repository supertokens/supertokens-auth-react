import { PrimitiveArrayClaim as PrimitiveArrayClaimWebJS } from "supertokens-web-js/recipe/session";

import type { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
import type { PrimitiveArrayClaimConfig } from "supertokens-web-js/recipe/session";

export class PrimitiveArrayClaim<T> extends PrimitiveArrayClaimWebJS<T> {
    constructor(
        config: PrimitiveArrayClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
        }
    ) {
        super(config);

        const validatorsWithCallbacks: { [key: string]: any } = { ...this.validators };

        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key as keyof PrimitiveArrayClaimWebJS<T>["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return {
                    ...validator(...args),
                    onSuccessRedirection: config.onSuccessRedirection,
                    onFailureRedirection: config.onFailureRedirection,
                };
            };
        }

        this.validators = validatorsWithCallbacks as PrimitiveArrayClaimWebJS<T>["validators"];
    }
}
