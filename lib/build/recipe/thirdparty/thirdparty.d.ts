import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { ThirdPartyConfig, ThirdPartyGetRedirectionURLContext, ThirdPartyUserInput, NormalisedThirdPartyConfig, ThirdPartyPreAPIHookContext, ThirdPartyOnHandleEventContext } from "./types";
export default class ThirdParty extends AuthRecipeModule<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartyOnHandleEventContext, NormalisedThirdPartyConfig> {
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    constructor(config: ThirdPartyConfig);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: ThirdPartyGetRedirectionURLContext) => Promise<string>;
    static init(config: ThirdPartyUserInput): CreateRecipeFunction<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartyOnHandleEventContext>;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
