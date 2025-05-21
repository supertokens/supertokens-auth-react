import WebauthnWebJS from "supertokens-web-js/lib/build/recipe/webauthn";
import AuthRecipe from "../authRecipe";
import type { GetRedirectionURLContext, NormalisedConfig, OnHandleEventContext, PreAndPostAPIHookAction, UserInput } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface, RecipeInitResult } from "../../types";
export default class Webauthn extends AuthRecipe<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof WebauthnWebJS>;
    static instance?: Webauthn;
    static RECIPE_ID: string;
    recipeID: string;
    firstFactorIds: "webauthn"[];
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>, webJSRecipe?: WebJSRecipeInterface<typeof WebauthnWebJS>);
    getFirstFactorsForAuthPage(): string[];
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(config?: UserInput): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): Webauthn;
    static reset(): void;
}
