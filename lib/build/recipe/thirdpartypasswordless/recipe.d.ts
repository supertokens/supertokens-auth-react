import AuthRecipe from "../authRecipe";
import Passwordless from "../passwordless/recipe";
import ThirdParty from "../thirdparty/recipe";
import type {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import type { CreateRecipeFunction } from "../../types";
import type { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
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
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdPartyPasswordless;
    static reset(): void;
}
