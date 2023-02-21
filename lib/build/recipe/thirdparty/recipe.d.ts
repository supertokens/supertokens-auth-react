import AuthRecipe from "../authRecipe";
import type {
    GetRedirectionURLContext,
    Config,
    NormalisedConfig,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    UserInput,
} from "./types";
import type { CreateRecipeFunction } from "../../types";
import type { RecipeInterface as WebJSRecipeInterface } from "supertokens-web-js/recipe/thirdparty";
export default class ThirdParty extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    recipeImpl: WebJSRecipeInterface;
    constructor(config: Config);
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
