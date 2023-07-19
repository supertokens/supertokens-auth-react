import ThirdpartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
import AuthRecipe from "../authRecipe";
import Passwordless from "../passwordless/recipe";
import ThirdParty from "../thirdparty/recipe";
import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";
export default class ThirdPartyPasswordless extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof ThirdpartyPasswordlessWebJS>;
    static instance?: ThirdPartyPasswordless;
    static RECIPE_ID: string;
    recipeID: string;
    passwordlessRecipe: Passwordless | undefined;
    thirdPartyRecipe: ThirdParty | undefined;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            passwordlessInstance: Passwordless | undefined;
        },
        webJSRecipe?: WebJSRecipeInterface<typeof ThirdpartyPasswordlessWebJS>
    );
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdPartyPasswordless;
    static reset(): void;
}
