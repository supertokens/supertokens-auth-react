/// <reference types="react" />
import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction } from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAPIHookContext,
    Config,
    NormalisedConfig,
    UserInput,
    RecipeInterface,
} from "./types";
export default class EmailPassword extends AuthRecipeModule<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (componentName: "emailverification" | "signinup" | "resetpassword") => JSX.Element;
    static init(
        config?: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
