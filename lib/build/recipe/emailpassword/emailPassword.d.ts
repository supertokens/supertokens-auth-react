import RecipeModule from "../recipeModule";
import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig, EmailPasswordRedirectionUrlAction, EmailPasswordUserInput, NormalisedEmailPasswordConfig, SignOutAPIResponse } from "./types";
import Session from "../session/session";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    private config;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    getDefaultRedirectionURL: (context: {
        action: EmailPasswordRedirectionUrlAction;
    }) => Promise<string>;
    getSessionRecipe: () => Session | undefined;
    doesSessionExist: () => boolean;
    signOut: () => Promise<{
        status: import("./constants").API_RESPONSE_STATUS.OK;
    }>;
    isEmailVerified(): Promise<boolean>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SignOutAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
