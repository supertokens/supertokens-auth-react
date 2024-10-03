import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import AuthRecipe from "../authRecipe";
import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof EmailPasswordWebJS>;
    static instance?: EmailPassword;
    static RECIPE_ID: "emailpassword";
    recipeID: "emailpassword";
    firstFactorIds: "emailpassword"[];
    getFirstFactorsForAuthPage(): string[];
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof EmailPasswordWebJS>
    );
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
