import { PrimitiveClaim as PrimitiveClaimWebJS, PrimitiveClaimConfig } from "supertokens-web-js/recipe/session";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";

export class PrimitiveClaim<T> extends PrimitiveClaimWebJS<T> {
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
            validatorsWithCallbacks[key as keyof PrimitiveClaimWebJS<T>["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return {
                    ...validator(...args),
                    onSuccessRedirection: config.onSuccessRedirection,
                    onFailureRedirection: config.onFailureRedirection,
                };
            };
        }

        this.validators = validatorsWithCallbacks as PrimitiveClaimWebJS<T>["validators"];
    }
}
