/// <reference types="react" />
import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    Config,
    NormalisedConfig,
    UserInput,
    InitOutput,
} from "./types";
import AuthRecipe from "../authRecipe";
import { RecipeInterface as WebJSRecipeInterface } from "supertokens-web-js/recipe/passwordless";
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly recipeImpl: WebJSRecipeInterface;
    static instance?: Passwordless;
    static RECIPE_ID: string;
    constructor(config: Config, recipeImpl?: WebJSRecipeInterface);
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(config: UserInput): InitOutput;
    static getInstanceOrThrow(): Passwordless;
    static reset(): void;
}
