import RecipeModule from "../recipeModule";
import { SuccessAPIResponse } from "../../types";
import { EmailVerificationConfig } from "./types";
export default class EmailVerification extends RecipeModule {
    config: EmailVerificationConfig;
    constructor(config: EmailVerificationConfig);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    isEmailVerified(): Promise<boolean>;
    signOut(): Promise<SuccessAPIResponse>;
    getDefaultRedirectionURL(context: unknown): Promise<string>;
    getEmailVerificationDefaultURL(context: {
        action: string;
    }): Promise<string>;
}
