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
    redirectToFactor({
        factorId,
        forceSetup,
        stepUp,
        redirectBack,
        navigate,
        userContext,
    }: {
        factorId: string;
        forceSetup: boolean | undefined;
        stepUp: boolean | undefined;
        redirectBack: boolean | undefined;
        navigate: Navigate | undefined;
        userContext: UserContext | undefined;
    }): Promise<void>;
    redirectToFactorChooser({
        redirectBack,
        nextFactorOptions,
        stepUp,
        navigate,
        userContext,
    }: {
        redirectBack: boolean | undefined;
        nextFactorOptions: string[] | undefined;
        stepUp: boolean | undefined;
        navigate: Navigate | undefined;
        userContext: UserContext | undefined;
    }): Promise<void>;
    static reset(): void;
}
