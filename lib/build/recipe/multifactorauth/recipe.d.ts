import MultiFactorAuthWebJS from "supertokens-web-js/recipe/multifactorauth";
import RecipeModule from "../recipeModule";
import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";
export default class MultiFactorAuth extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof MultiFactorAuthWebJS>;
    static instance?: MultiFactorAuth;
    static RECIPE_ID: string;
    static MultiFactorAuthClaim: import("supertokens-web-js/lib/build/recipe/multifactorauth/multiFactorAuthClaim").MultiFactorAuthClaimClass;
    recipeID: string;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof MultiFactorAuthWebJS>
    );
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): MultiFactorAuth;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getDefaultFirstFactors(): string[];
}
