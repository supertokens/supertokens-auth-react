import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as OAuth2LogoutScreen } from "./components/features/oauth2LogoutScreen";
import { default as TryRefreshPageFeature } from "./components/features/tryRefreshPage";
import { defaultTranslationsOAuth2Provider } from "./components/themes/translations";
import { DEFAULT_TRY_REFRESH_PATH, DEFAULT_OAUTH2_LOGOUT_PATH } from "./constants";
import OAuth2ProviderRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class OAuth2ProviderPreBuiltUI extends RecipeRouter {
    static instance?: OAuth2ProviderPreBuiltUI;
    languageTranslations = defaultTranslationsOAuth2Provider;
    static languageTranslations = defaultTranslationsOAuth2Provider;

    constructor(public readonly recipeInstance: OAuth2ProviderRecipe) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): OAuth2ProviderPreBuiltUI {
        if (OAuth2ProviderPreBuiltUI.instance === undefined) {
            const recipeInstance = OAuth2ProviderRecipe.getInstanceOrThrow();
            OAuth2ProviderPreBuiltUI.instance = new OAuth2ProviderPreBuiltUI(recipeInstance);
        }

        return OAuth2ProviderPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "try-refresh-page" | "oauth2-logout-screen",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }

    // Instance methods
    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        if (this.recipeInstance.config.disableDefaultUI) {
            return {};
        }
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.tryRefreshPage.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_TRY_REFRESH_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("try-refresh-page", props, useComponentOverrides),
                recipeID: OAuth2ProviderRecipe.RECIPE_ID,
            };
        }
        if (this.recipeInstance.config.oauth2LogoutScreen.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_OAUTH2_LOGOUT_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props) =>
                    this.getFeatureComponent("oauth2-logout-screen", props as any, useComponentOverrides),
                recipeID: OAuth2ProviderRecipe.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        componentName: "try-refresh-page" | "oauth2-logout-screen",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "try-refresh-page") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} overrideGlobalClaimValidators={() => []}>
                        <TryRefreshPageFeature
                            recipe={this.recipeInstance}
                            useComponentOverrides={useComponentOverrides}
                            {...props}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        } else if (componentName === "oauth2-logout-screen") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} overrideGlobalClaimValidators={() => []}>
                        <OAuth2LogoutScreen
                            recipe={this.recipeInstance}
                            useComponentOverrides={useComponentOverrides}
                            {...props}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        }
        throw new Error("Should never come here.");
    };

    getAuthComponents(): AuthComponent[] {
        return [];
    }

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        OAuth2ProviderPreBuiltUI.instance = undefined;
        return;
    }

    static TryRefreshPage = (props: FeatureBaseProps<{ userContext?: UserContext }>) =>
        OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("try-refresh-page", props);
    static OAuth2LogoutScreen = (props: FeatureBaseProps<{ userContext?: UserContext }>) =>
        OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("oauth2-logout-screen", props);
}

const TryRefreshPage = OAuth2ProviderPreBuiltUI.TryRefreshPage;

export { TryRefreshPage };
