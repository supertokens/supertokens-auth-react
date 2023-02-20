import { EmailVerificationClaimClass as EmailVerificationClaimClassWebJS } from "supertokens-web-js/recipe/emailverification";

import EmailVerification from "../recipe/emailverification/recipe";

import type { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

export class EmailVerificationClaimClass extends EmailVerificationClaimClassWebJS {
    constructor(
        getRecipeImpl: () => RecipeInterface,
        onSuccessRedirection?: ValidationSuccessCallback,
        onFailureRedirection?: ValidationFailureCallback
    ) {
        super(getRecipeImpl);

        const validatorsWithCallbacks: { [key: string]: any } = { ...this.validators };

        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key as keyof EmailVerificationClaimClassWebJS["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return {
                    ...validator(...args),
                    onSuccessRedirection: onSuccessRedirection,
                    onFailureRedirection: (args: { userContext: any; reason: any }) => {
                        if (onFailureRedirection !== undefined) {
                            return onFailureRedirection(args);
                        }
                        const recipe = EmailVerification.getInstanceOrThrow();
                        if (recipe.config.mode === "REQUIRED") {
                            return recipe.getRedirectUrl({ action: "VERIFY_EMAIL" });
                        }
                        return undefined;
                    },
                };
            };
        }

        this.validators = validatorsWithCallbacks as EmailVerificationClaimClassWebJS["validators"];
    }
}
