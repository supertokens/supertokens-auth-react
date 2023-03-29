import { PrimitiveClaim as PrimitiveClaimWebJS } from "supertokens-web-js/recipe/session";

import type { ValidationFailureCallback } from "../types";
import type { PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";

export class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
    constructor(
        config: PrimitiveClaimConfig & {
            onFailureRedirection?: ValidationFailureCallback;
            showAccessDeniedOnFailure?: boolean;
        }
    ) {
        super(config);

        const validatorsWithCallbacks: { [key: string]: any } = { ...this.validators };

        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key as keyof PrimitiveClaimWebJS<T>["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return {
                    ...validator(...args),
                    onFailureRedirection: config.onFailureRedirection,
                    showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                };
            };
        }

        this.validators = validatorsWithCallbacks as PrimitiveClaimWebJS<T>["validators"];
    }
}
