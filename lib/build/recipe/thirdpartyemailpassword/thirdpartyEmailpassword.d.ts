import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { ThirdPartyEmailPasswordConfig, ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordUserInput, NormalisedThirdPartyEmailPasswordConfig, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext } from "./types";
import { NormalisedAuthRecipeConfig } from "../authRecipeModule/types";
export default class ThirdPartyEmailPassword extends AuthRecipeModule<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext> {
    static instance?: ThirdPartyEmailPassword;
    static RECIPE_ID: string;
    config: NormalisedThirdPartyEmailPasswordConfig & NormalisedAuthRecipeConfig;
    constructor(config: ThirdPartyEmailPasswordConfig);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: ThirdPartyEmailPasswordGetRedirectionURLContext) => Promise<string>;
    static init(config: ThirdPartyEmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): ThirdPartyEmailPassword;
    static reset(): void;
}
