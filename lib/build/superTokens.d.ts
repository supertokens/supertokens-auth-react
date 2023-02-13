import RecipeModule from "./recipe/recipeModule";
import { GetRedirectionURLContext, NormalisedAppInfo, SuperTokensConfig } from "./types";
import { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import { TranslationController, TranslationFunc, TranslationStore } from "./translation/translationHelpers";
export default class SuperTokens {
    private static instance?;
    appInfo: NormalisedAppInfo;
    languageTranslations: {
        defaultLanguage: string;
        userTranslationStore: TranslationStore;
        currentLanguageCookieScope: string | undefined;
        translationEventSource: TranslationController;
        userTranslationFunc?: TranslationFunc;
    };
    recipeList: RecipeModule<any, any, any, any>[];
    private userGetRedirectionURL;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    getRecipeOrThrow<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>>(
        recipeId: string
    ): RecipeModule<T, S, R, N>;
    changeLanguage: (lang: string) => Promise<void>;
    loadTranslation(store: TranslationStore): void;
    getRedirectUrl(context: GetRedirectionURLContext): Promise<string>;
    redirectToAuth: (options: {
        show?: "signin" | "signup" | undefined;
        history?: any;
        queryParams?: any;
        redirectBack: boolean;
    }) => Promise<void>;
    redirectToUrl: (redirectUrl: string, history?: any) => Promise<void>;
    static reset(): void;
}
