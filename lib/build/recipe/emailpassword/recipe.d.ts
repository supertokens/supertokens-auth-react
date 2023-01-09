/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    Config,
    NormalisedConfig,
    UserInput,
    InitOutput,
} from "./types";
import { RecipeInterface as WebJsRecipeInterface } from "supertokens-web-js/recipe/emailpassword";
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly recipeImpl: WebJsRecipeInterface;
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    constructor(config: Config, recipeImpl?: WebJsRecipeInterface);
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(config?: UserInput): InitOutput;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
