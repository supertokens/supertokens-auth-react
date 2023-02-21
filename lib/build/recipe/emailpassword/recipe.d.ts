import AuthRecipe from "../authRecipe";
import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    Config,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { CreateRecipeFunction } from "../../types";
import type { RecipeInterface as WebJsRecipeInterface } from "supertokens-web-js/recipe/emailpassword";
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    recipeImpl: WebJsRecipeInterface;
    constructor(config: Config);
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config?: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
