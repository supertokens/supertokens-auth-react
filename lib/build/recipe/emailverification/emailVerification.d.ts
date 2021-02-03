import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { EmailVerificationConfig, EmailVerificationUserInputAndHooks, NormalisedEmailVerificationConfig } from "./types";
export default class EmailVerification extends RecipeModule {
    static instance?: EmailVerification;
    config: NormalisedEmailVerificationConfig;
    constructor(config: EmailVerificationConfig);
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    isEmailVerified(): Promise<boolean>;
    static init(config: EmailVerificationUserInputAndHooks): CreateRecipeFunction;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): EmailVerification;
    static reset(): void;
}
