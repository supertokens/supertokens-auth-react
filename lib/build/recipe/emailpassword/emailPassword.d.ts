import { CreateRecipeFunction, SuccessAPIResponse, NormalisedAuthRecipeConfig } from "../../types";
import { EmailPasswordConfig, EmailPasswordGetRedirectionURLContext, EmailPasswordUserInput, NormalisedEmailPasswordConfig } from "./types";
import Session from "../session/session";
import AuthRecipeModule from "../authRecipeModule";
export default class EmailPassword extends AuthRecipeModule {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    config: NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    getDefaultRedirectionURL: (context: EmailPasswordGetRedirectionURLContext) => Promise<string>;
    getSessionRecipe: () => Session | undefined;
    doesSessionExist: () => boolean;
    signOut: () => Promise<SuccessAPIResponse>;
    isEmailVerified(): Promise<boolean>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
