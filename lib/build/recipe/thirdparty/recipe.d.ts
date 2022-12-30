/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import {
    CreateRecipeFunction as CreateRecipeFunctionAuthReact,
    RecipeFeatureComponentMap,
    FeatureBaseProps,
} from "../../types";
import {
    GetRedirectionURLContext,
    Config,
    NormalisedConfig,
    PreAndPostAPIHookAction as PreAndPostAPIHookActionAuthReact,
    OnHandleEventContext,
    UserInput,
} from "./types";
import {
    PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS,
    RecipeInterface as WebJSRecipeInterface,
} from "supertokens-web-js/recipe/thirdparty";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
export default class ThirdParty extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    recipeImpl: WebJSRecipeInterface;
    constructor(config: Config);
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(config: UserInput): {
        authReact: CreateRecipeFunctionAuthReact<
            GetRedirectionURLContext,
            PreAndPostAPIHookActionAuthReact,
            OnHandleEventContext,
            NormalisedConfig
        >;
        webJS: CreateRecipeFunctionWebJS<PreAndPostAPIHookActionWebJS>;
    };
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
