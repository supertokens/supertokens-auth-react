import { TranslationController } from "./translation/translationHelpers";
import type RecipeModule from "./recipe/recipeModule";
import type { BaseRecipeModule } from "./recipe/recipeModule/baseRecipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type {
    Navigate,
    GetRedirectionURLContext,
    NormalisedAppInfo,
    SuperTokensConfig,
    UserContext,
    NormalisedGetRedirectionURLContext,
} from "./types";
export default class SuperTokens {
    private static instance?;
    static usesDynamicLoginMethods: boolean;
    appInfo: NormalisedAppInfo;
    languageTranslations: {
        defaultLanguage: string;
        userTranslationStore: TranslationStore;
        currentLanguageCookieScope: string | undefined;
        translationEventSource: TranslationController;
        userTranslationFunc?: TranslationFunc;
    };
    recipeList: BaseRecipeModule<any, any, any, any>[];
    private userGetRedirectionURL;
    rootStyle: string;
    useShadowDom: boolean;
    privacyPolicyLink: string | undefined;
    termsOfServiceLink: string | undefined;
    defaultToSignUp: boolean;
    disableAuthRoute: boolean;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    getRecipeOrThrow<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>>(
        recipeId: string
    ): RecipeModule<T, S, R, N>;
    changeLanguage: (lang: string) => Promise<void>;
    loadTranslation(store: TranslationStore): void;
    getRedirectUrl(
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContext>,
        userContext: UserContext
    ): Promise<string | null>;
    redirectToAuth: (options: {
        show?: "signin" | "signup" | undefined;
        navigate?: Navigate | undefined;
        queryParams?: any;
        redirectBack: boolean;
        userContext: UserContext;
    }) => Promise<void>;
    redirectToUrl: (redirectUrl: string, navigate?: Navigate) => Promise<void>;
    redirect: (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContext>,
        navigate?: Navigate,
        queryParams?: Record<string, string>,
        userContext?: UserContext
    ) => Promise<void>;
    static reset(): void;
}
export declare function doRedirection(appInfo: NormalisedAppInfo, redirectUrl: string, navigate?: Navigate): void;
