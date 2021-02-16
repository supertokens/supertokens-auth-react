import RecipeModule from "../recipeModule";
import { SuccessAPIResponse } from "../../types";
import { EmailVerificationConfig } from "./types";
export default class EmailVerification<T, S, R> extends RecipeModule<T, S, R> {
    config: EmailVerificationConfig<T, S, R>;
    constructor(config: EmailVerificationConfig<T, S, R>);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    isEmailVerified(): Promise<boolean>;
    signOut(): Promise<SuccessAPIResponse>;
    getDefaultRedirectionURL(context: unknown): Promise<string>;
    getEmailVerificationDefaultURL(context: {
        action: string;
    }): Promise<string>;
}
