import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { EmailPasswordConfig, EmailPasswordGetRedirectionURLContext, EmailPasswordOnHandleEventContext, EmailPasswordPreAPIHookContext, EmailPasswordUserInput, NormalisedEmailPasswordConfig } from "./types";
export default class EmailPassword extends AuthRecipeModule<EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext, NormalisedEmailPasswordConfig> {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    constructor(config: EmailPasswordConfig);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: EmailPasswordGetRedirectionURLContext) => Promise<string>;
    redirectToAuth: (show?: "signin" | "signup" | undefined) => void;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction<EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext>;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): EmailPassword;
    static redirectToAuth(show?: "signin" | "signup"): void;
    static reset(): void;
}
