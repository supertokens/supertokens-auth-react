/// <reference types="react" />
import RecipeModule from "./recipe/recipeModule";
import { ComponentWithRecipeAndMatchingMethod, NormalisedAppInfo, SuperTokensConfig } from "./types";
import NormalisedURLPath from "./normalisedURLPath";
import { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import { TranslationController, TranslationFunc, TranslationStore } from "./translationHelpers";
export default class SuperTokens {
    private static instance?;
    private static reactRouterDom?;
    private static reactRouterDomIsV6;
    appInfo: NormalisedAppInfo;
    languageTranslations: {
        defaultLanguage: string;
        userTranslationStore: TranslationStore;
        currentLanguageCookieScope: string;
        translationEventSource: TranslationController;
        userTranslationFunc?: TranslationFunc;
    };
    recipeList: RecipeModule<any, any, any, any>[];
    private pathsToFeatureComponentWithRecipeIdMap?;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[];
    canHandleRoute: () => boolean;
    getRoutingComponent: () => JSX.Element | null;
    getPathsToFeatureComponentWithRecipeIdMap: () => Record<string, ComponentWithRecipeAndMatchingMethod[]>;
    getMatchingComponentForRouteAndRecipeId: (
        normalisedUrl: NormalisedURLPath
    ) => ComponentWithRecipeAndMatchingMethod | undefined;
    getRecipeOrThrow<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>>(
        recipeId: string
    ): RecipeModule<T, S, R, N>;
    getReactRouterDomWithCustomHistory: () =>
        | {
              router: {
                  Route: any;
              };
              useHistoryCustom: () => any;
          }
        | undefined;
    changeLanguage(lang: string): void;
    loadTranslation(store: TranslationStore): void;
    static reset(): void;
}
