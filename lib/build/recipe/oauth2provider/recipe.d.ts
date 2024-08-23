import OAuth2WebJS from "supertokens-web-js/recipe/oauth2provider";
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
    UserContext,
} from "../../types";
export default class OAuth2Provider extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof OAuth2WebJS>;
    static instance?: OAuth2Provider;
    static readonly RECIPE_ID = "oauth2provider";
    readonly recipeID = "oauth2provider";
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof OAuth2WebJS>
    );
    static init(config?: UserInput): RecipeInitResult<any, never, any, any>;
    static getInstanceOrThrow(): OAuth2Provider;
    static getInstance(): OAuth2Provider | undefined;
    getDefaultRedirectionURL(ctx: GetRedirectionURLContext): Promise<string>;
    logOut(
        logoutChallenge: string,
        userContext: UserContext
    ): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
    static reset(): void;
}
