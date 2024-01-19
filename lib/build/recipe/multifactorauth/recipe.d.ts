import MultiFactorAuthWebJS from "supertokens-web-js/recipe/multifactorauth";
import RecipeModule from "../recipeModule";
import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";
import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    SecondaryFactorRedirectionInfo,
} from "./types";
import type {
    Navigate,
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeInitResult,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
export default class MultiFactorAuth extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof MultiFactorAuthWebJS>;
    static instance?: MultiFactorAuth;
    static RECIPE_ID: string;
    static MultiFactorAuthClaim: MultiFactorAuthClaimClass;
    recipeID: string;
    private secondaryFactors;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof MultiFactorAuthWebJS>
    );
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstance(): MultiFactorAuth | undefined;
    static getInstanceOrThrow(): MultiFactorAuth;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext, userContext: UserContext) => Promise<string>;
    addMFAFactors(secondaryFactors: SecondaryFactorRedirectionInfo[]): void;
    isFirstFactorEnabledOnClient(factorId: string): boolean;
    getSecondaryFactors(userContext: UserContext): SecondaryFactorRedirectionInfo[];
    redirectToFactor(
        factorId: string,
        forceSetup?: boolean,
        redirectBack?: boolean,
        navigate?: Navigate,
        userContext?: UserContext
    ): Promise<void>;
    redirectToFactorChooser(
        redirectBack?: boolean,
        nextFactorOptions?: string[],
        navigate?: Navigate,
        userContext?: UserContext
    ): Promise<void>;
    static reset(): void;
}
