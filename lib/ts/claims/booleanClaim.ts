import { BooleanClaim as BooleanClaimWebJS, PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";

export class BooleanClaim extends BooleanClaimWebJS {
    constructor(
        config: PrimitiveClaimConfig & {
            onSuccessRedirection?: ValidationSuccessCallback;
            onFailureRedirection?: ValidationFailureCallback;
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
                    onSuccessRedirection: config.onSuccessRedirection,
                    onFailureRedirection: config.onFailureRedirection,
                };
            };
        }

        this.validators = validatorsWithCallbacks as BooleanClaimWebJS["validators"];
    }
}
