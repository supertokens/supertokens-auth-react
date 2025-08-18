import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest } from "../../utils";
import { FactorIds } from "../multifactorauth";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInAndUpFeature from "./components/features/signInAndUp";
import SignInAndUpCallbackFeature from "./components/features/signInAndUpCallback";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import { defaultTranslationsThirdParty } from "./components/themes/translations";
import ThirdParty from "./recipe";
import { matchRecipeIdUsingState } from "./utils";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class ThirdPartyPreBuiltUI extends RecipeRouter {
    static instance?: ThirdPartyPreBuiltUI;
    languageTranslations = defaultTranslationsThirdParty;
    static languageTranslations = defaultTranslationsThirdParty;

    constructor(public readonly recipeInstance: ThirdParty) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): ThirdPartyPreBuiltUI {
        if (ThirdPartyPreBuiltUI.instance === undefined) {
            const recipeInstace = ThirdParty.getInstanceOrThrow();
            ThirdPartyPreBuiltUI.instance = new ThirdPartyPreBuiltUI(recipeInstace);
        }

        return ThirdPartyPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "signinupcallback",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
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

        // Add callback route for all provider
        const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
            new NormalisedURLPath("/callback/:id")
        );
        features[normalisedFullPath.getAsStringDangerous()] = {
            matches: () => matchRecipeIdUsingState(this.recipeInstance, {}),
            component: (prop: any) => this.getFeatureComponent("signinupcallback", prop, useComponentOverrides),
            recipeID: ThirdParty.RECIPE_ID,
        };

        return features;
    };
    getFeatureComponent = (
        componentName: "signinupcallback",
        props: FeatureBaseProps<{ redirectOnSessionExists?: boolean; userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "signinupcallback") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} doRedirection={false}>
                        <SignInAndUpCallbackFeature
                            recipe={this.recipeInstance}
                            {...props}
                            useComponentOverrides={useComponentOverrides}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here");
        }
    };

    getAuthComponents(): AuthComponent[] {
        return [
            {
                component: (props) => (
                    <SignInAndUpFeature
                        key="thirdparty-signinup"
                        {...props}
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                    />
                ),
                displayOrder: 1,
                factorIds: [FactorIds.THIRDPARTY],
                type: "SIGN_IN_UP",
            },
        ];
    }

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        ThirdPartyPreBuiltUI.instance = undefined;
        return;
    }

    static SignInAndUpCallback = (prop: FeatureBaseProps<{ userContext?: UserContext }>) =>
        ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinupcallback", prop);
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
}

const SignInAndUpCallback = ThirdPartyPreBuiltUI.SignInAndUpCallback;

export { SignInAndUpCallback, SignInAndUpCallbackTheme };
