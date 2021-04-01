import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { ThirdPartyEmailPasswordConfig, ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordUserInput, NormalisedThirdPartyEmailPasswordConfig, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext } from "./types";
export default class ThirdPartyEmailPassword extends AuthRecipeModule<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext, NormalisedThirdPartyEmailPasswordConfig> {
    static instance?: ThirdPartyEmailPassword;
    static RECIPE_ID: string;
    constructor(config: ThirdPartyEmailPasswordConfig);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: ThirdPartyEmailPasswordGetRedirectionURLContext) => Promise<string>;
    redirectToAuth: (show?: "signin" | "signup" | undefined) => void;
    static init(config: ThirdPartyEmailPasswordUserInput): CreateRecipeFunction<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext>;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): ThirdPartyEmailPassword;
    static redirectToAuth(show?: "signin" | "signup"): void;
    static reset(): void;
}
