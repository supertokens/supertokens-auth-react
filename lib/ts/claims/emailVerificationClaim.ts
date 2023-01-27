import {
    EmailVerificationClaimClass as EmailVerificationClaimClassWebJS,
    RecipeInterface,
} from "supertokens-web-js/recipe/emailverification";
import EmailVerification from "../recipe/emailverification/recipe";

type ValidationCallback = (() => Promise<string | undefined>) | undefined;

const defaultOnFailure = async (): Promise<string | undefined> => {
    const recipe = EmailVerification.getInstanceOrThrow();
    return recipe.getRedirectUrl({ action: "VERIFY_EMAIL" });
};

export class EmailVerificationClaimClass extends EmailVerificationClaimClassWebJS {
    constructor(
        getRecipeImpl: () => RecipeInterface,
        updateContextOnIsVerifiedFalse?: (userContext: any) => void | Promise<void>,
        onSuccess?: ValidationCallback,
        onFailure?: ValidationCallback
    ) {
        super(getRecipeImpl, updateContextOnIsVerifiedFalse);

        const validatorsWithCallbacks: { [key: string]: any } = { ...this.validators };

        for (const key in validatorsWithCallbacks) {
            const validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key as keyof EmailVerificationClaimClassWebJS["validators"]] = (
                ...args: Parameters<typeof validator>
            ) => {
                return {
                    ...validator(...args),
                    onSuccess: onSuccess,
                    onFailure: () => {
                        const recipe = EmailVerification.getInstanceOrThrow();
                        if (recipe.config.mode === "REQUIRED") {
                            if (onFailure !== undefined) {
                                return onFailure();
                            }
                            return defaultOnFailure();
                        }
                        return undefined;
                    },
                };
            };
        }

        this.validators = validatorsWithCallbacks as EmailVerificationClaimClassWebJS["validators"];
    }
}
