import OAuth2WebJS from "supertokens-web-js/recipe/oauth2";
import RecipeModule from "../recipeModule";
import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";
import type {
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
    SuccessRedirectContextOAuth2,
} from "../../types";
export default class OAuth2 extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof OAuth2WebJS>;
    static instance?: OAuth2;
    static readonly RECIPE_ID = "oauth2";
    readonly recipeID = "oauth2";
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof OAuth2WebJS>
    );
    static init(config?: UserInput): RecipeInitResult<any, never, any, any>;
    static getInstanceOrThrow(): OAuth2;
    static getInstance(): OAuth2 | undefined;
    getDefaultRedirectionURL(ctx: SuccessRedirectContextOAuth2): Promise<string>;
    static reset(): void;
}