/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import {
    CreateRecipeFunction as CreateRecipeFunctionAuthReact,
    RecipeFeatureComponentMap,
    FeatureBaseProps,
} from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction as PreAndPostAPIHookActionAuthReact,
    Config,
    NormalisedConfig,
    UserInput,
} from "./types";
import { RecipeInterface as WebJsRecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/lib/build/recipe/emailpassword/types";
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
    static init(config?: UserInput): {
        authReact: CreateRecipeFunctionAuthReact<
            GetRedirectionURLContext,
            PreAndPostAPIHookActionAuthReact,
            OnHandleEventContext,
            NormalisedConfig
        >;
        webJS: CreateRecipeFunctionWebJS<PreAndPostAPIHookActionWebJS>;
    };
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
