import { BooleanClaim as BooleanClaimWebJS } from "supertokens-web-js/recipe/session";

import type { ValidationFailureCallback } from "../types";
import type { PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";

export class BooleanClaim extends BooleanClaimWebJS {
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
            validatorsWithCallbacks[key as keyof BooleanClaimWebJS["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return {
                    ...validator(...args),
                    onFailureRedirection: config.onFailureRedirection,
                    showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                };
            };
        }

        this.validators = validatorsWithCallbacks as BooleanClaimWebJS["validators"];
    }
}
