/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import {
    GetRedirectionURLContext,
    Config,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    InitOutput,
} from "./types";
import { RecipeInterface as WebJSRecipeInterface } from "supertokens-web-js/recipe/thirdparty";
export default class ThirdParty extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly recipeImpl: WebJSRecipeInterface;
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    constructor(config: Config, recipeImpl?: WebJSRecipeInterface);
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(config: UserInput): InitOutput;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
