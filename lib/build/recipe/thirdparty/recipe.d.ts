/// <reference types="react" />
import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction } from "../../types";
import {
    GetRedirectionURLContext,
    Config,
    NormalisedConfig,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
} from "./types";
import EmailVerification from "../emailverification/recipe";
export default class ThirdParty extends AuthRecipeModule<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(
        config: Config,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getFeatureComponent: (
        componentName: "signinup" | "emailverification" | "signinupcallback",
        prop: any
    ) => JSX.Element;
    getDefaultRedirectionURL: (
        context: import("../authRecipeModule/types").GetRedirectionURLContext
    ) => Promise<string>;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
