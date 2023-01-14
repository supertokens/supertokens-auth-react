/// <reference types="react" />
import {
    RecipeFeatureComponentMap,
    FeatureBaseProps,
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
} from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
    UserInput,
} from "./types";
import AuthRecipe from "../authRecipe";
import PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/recipe/passwordless/types";
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof PasswordlessWebJS>;
    static instance?: Passwordless;
    static RECIPE_ID: string;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof PasswordlessWebJS>
    );
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(
        config: UserInput
    ): RecipeInitResult<
        GetRedirectionURLContext,
        PreAndPostAPIHookAction,
        OnHandleEventContext,
        NormalisedConfig,
        PreAndPostAPIHookActionWebJS
    >;
    static getInstanceOrThrow(): Passwordless;
    static reset(): void;
}
