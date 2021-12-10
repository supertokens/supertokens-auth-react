/// <reference types="react" />
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
import AuthRecipe from "../authRecipe";
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: Passwordless;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: import("../authRecipe/types").GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (componentName: "signInUp" | "linkClickedScreen", props: any) => JSX.Element;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): Passwordless;
    static reset(): void;
}
