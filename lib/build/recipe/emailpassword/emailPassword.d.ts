import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { EmailPasswordConfig, EmailPasswordGetRedirectionURLContext, EmailPasswordUserInput, NormalisedEmailPasswordConfig } from "./types";
import { NormalisedAuthRecipeConfig } from "../authRecipeModule/types";
export default class EmailPassword extends AuthRecipeModule {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    config: NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig;
    constructor(config: EmailPasswordConfig);
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    getDefaultRedirectionURL: (context: EmailPasswordGetRedirectionURLContext) => Promise<string>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
