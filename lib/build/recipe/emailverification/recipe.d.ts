import RecipeModule from "../recipeModule";
import { Config, NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, UserInput } from "./types";
import { CreateRecipeFunction } from "../../types";
export default class EmailVerification extends RecipeModule<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig> {
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    constructor(config: Config);
    static init(config: UserInput): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailVerification;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    isEmailVerified(): Promise<boolean>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
}
