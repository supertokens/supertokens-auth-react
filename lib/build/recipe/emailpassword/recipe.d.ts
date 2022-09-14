/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import { CreateRecipeFunction, RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    Config,
    NormalisedConfig,
    UserInput,
} from "./types";
import { RecipeInterface as WebJsRecipeInterface } from "supertokens-web-js/recipe/emailpassword";
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    recipeImpl: WebJsRecipeInterface;
    constructor(config: Config);
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(
        config?: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
