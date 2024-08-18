import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as TryRefreshPageFeature } from "./components/features/tryRefreshPage";
import { defaultTranslationsOAuth2Provider } from "./components/themes/translations";
import { DEFAULT_TRY_REFRESH_PATH } from "./constants";
import OAuth2ProviderRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class OAuth2ProviderPreBuiltUI extends RecipeRouter {
    static instance?: OAuth2ProviderPreBuiltUI;
    languageTranslations = defaultTranslationsOAuth2Provider;

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
        componentName: "try-refresh-page",
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
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_TRY_REFRESH_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("try-refresh-page", props, useComponentOverrides),
                recipeID: OAuth2ProviderRecipe.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: "try-refresh-page",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
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
}

const TryRefreshPage = OAuth2ProviderPreBuiltUI.TryRefreshPage;

export { TryRefreshPage };
