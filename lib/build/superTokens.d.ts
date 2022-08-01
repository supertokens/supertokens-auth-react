/// <reference types="react" />
import RecipeModule from "./recipe/recipeModule";
import {
    ComponentWithRecipeAndMatchingMethod,
    GetRedirectionURLContext,
    NormalisedAppInfo,
    SuperTokensConfig,
} from "./types";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { BaseFeatureComponentMap } from "./types";
import { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import { TranslationController, TranslationFunc, TranslationStore } from "./translation/translationHelpers";
export default class SuperTokens {
    private static instance?;
    private static reactRouterDom?;
    private static reactRouterDomIsV6;
    appInfo: NormalisedAppInfo;
    languageTranslations: {
        defaultLanguage: string;
        userTranslationStore: TranslationStore;
        currentLanguageCookieScope: string | undefined;
        translationEventSource: TranslationController;
        userTranslationFunc?: TranslationFunc;
    };
    recipeList: RecipeModule<any, any, any, any>[];
    private pathsToFeatureComponentWithRecipeIdMap?;
    private userGetRedirectionURL;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[];
    static getReactRouterDomWithCustomHistory():
        | {
              router: {
                  Route: any;
              };
              useHistoryCustom: () => any;
          }
        | undefined;
    canHandleRoute: () => boolean;
    getRoutingComponent: () => JSX.Element | null;
    getPathsToFeatureComponentWithRecipeIdMap: () => BaseFeatureComponentMap;
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
