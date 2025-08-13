import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import RecipeModule from "../recipeModule";
import { EmailVerificationClaimClass } from "./emailVerificationClaim";
import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type {
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeInitResult,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof EmailVerificationWebJS>;
    static instance?: EmailVerification;
    static RECIPE_ID: "emailverification";
    static EmailVerificationClaim: EmailVerificationClaimClass;
    recipeID: "emailverification";
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof EmailVerificationWebJS>
    );
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailVerification;
    isEmailVerified(userContext: UserContext): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static reset(): void;
}
