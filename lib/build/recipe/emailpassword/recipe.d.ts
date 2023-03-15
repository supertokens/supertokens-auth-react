/// <reference types="react" />
import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import AuthRecipe from "../authRecipe";
import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type {
    RecipeFeatureComponentMap,
    FeatureBaseProps,
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
} from "../../types";
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof EmailPasswordWebJS>;
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof EmailPasswordWebJS>
    );
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
