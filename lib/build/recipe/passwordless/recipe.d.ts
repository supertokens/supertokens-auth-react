/// <reference types="react" />
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
import AuthRecipe from "../authRecipe";
import {
    PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS,
    RecipeInterface,
} from "supertokens-web-js/recipe/passwordless";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookActionAuthReact,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: Passwordless;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(config: UserInput): {
        authReact: CreateRecipeFunctionAuthReact<
            GetRedirectionURLContext,
            PreAndPostAPIHookActionAuthReact,
            OnHandleEventContext,
            NormalisedConfig
        >;
        webJS: CreateRecipeFunctionWebJS<PreAndPostAPIHookActionWebJS>;
    };
    static getInstanceOrThrow(): Passwordless;
    static reset(): void;
}
