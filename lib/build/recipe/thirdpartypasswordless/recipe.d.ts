/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import {
    CreateRecipeFunction as CreateRecipeFunctionAuthReact,
    RecipeFeatureComponentMap,
    FeatureBaseProps,
} from "../../types";
import {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import Passwordless from "../passwordless/recipe";
import ThirdParty from "../thirdparty/recipe";
import { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/recipe/thirdpartypasswordless/types";
export default class ThirdPartyPasswordless extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdPartyPasswordless;
    static RECIPE_ID: string;
    passwordlessRecipe: Passwordless | undefined;
    thirdPartyRecipe: ThirdParty | undefined;
    recipeImpl: TPPWlessRecipeInterface;
    constructor(
        config: Config,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            passwordlessInstance: Passwordless | undefined;
        }
    );
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(config: UserInput): {
        authReact: CreateRecipeFunctionAuthReact<
            GetRedirectionURLContext,
            PreAndPostAPIHookAction,
            OnHandleEventContext,
            NormalisedConfig
        >;
        webJS: CreateRecipeFunctionWebJS<PreAndPostAPIHookActionWebJS>;
    };
    static getInstanceOrThrow(): ThirdPartyPasswordless;
    static reset(): void;
}
