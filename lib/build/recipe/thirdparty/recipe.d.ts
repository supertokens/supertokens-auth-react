/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import {
    RecipeFeatureComponentMap,
    FeatureBaseProps,
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
} from "../../types";
import {
    GetRedirectionURLContext,
    NormalisedConfig,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    UserInput,
} from "./types";
import ThirdpartyWebJS from "supertokens-web-js/recipe/thirdparty";
import { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/recipe/thirdparty/types";
export default class ThirdParty extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof ThirdpartyWebJS>;
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof ThirdpartyWebJS>
    );
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config: UserInput
    ): RecipeInitResult<
        GetRedirectionURLContext,
        PreAndPostAPIHookAction,
        OnHandleEventContext,
        NormalisedConfig,
        PreAndPostAPIHookActionWebJS
    >;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
