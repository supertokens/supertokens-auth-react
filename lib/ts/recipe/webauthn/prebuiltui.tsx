import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";

import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { FactorIds } from "../multifactorauth";
import { RecipeRouter } from "../recipeRouter";
import SessionAuth from "../session/sessionAuth";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { RecoverAccountUsingToken } from "./components/features/recoverAccountWithToken";
import { SendRecoveryEmailForm } from "./components/features/sendRecoveryEmail";
import SignInWithPasskeyFeature from "./components/features/signIn";
import SignUpFeature, { SignUpWithPasskeyFeature } from "./components/features/signUp";
import { defaultTranslationsWebauthn } from "./components/themes/translations";
import { DEFAULT_WEBAUTHN_RECOVERY_PATH, DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH } from "./constants";
import WebauthnRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type {
    AuthComponent,
    FeatureBaseProps,
    PartialAuthComponentProps,
    RecipeFeatureComponentMap,
    UserContext,
} from "../../types";

export class WebauthnPreBuiltUI extends RecipeRouter {
    static instance?: WebauthnPreBuiltUI;
    languageTranslations = defaultTranslationsWebauthn;

    constructor(public readonly recipeInstance: WebauthnRecipe) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): WebauthnPreBuiltUI {
        if (WebauthnPreBuiltUI.instance === undefined) {
            const recipeInstance = WebauthnRecipe.getInstanceOrThrow();
            WebauthnPreBuiltUI.instance = new WebauthnPreBuiltUI(recipeInstance);
        }

        return WebauthnPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "webauthn-recover-account" | "webauthn-send-recovery-email",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
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
                new NormalisedURLPath(DEFAULT_WEBAUTHN_RECOVERY_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) =>
                    this.getFeatureComponent("webauthn-recover-account", props, useComponentOverrides),
                recipeID: WebauthnRecipe.RECIPE_ID,
            };

            const normalisedFullPathForRecoveryThroughEmail =
                this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath(DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH)
                );
            features[normalisedFullPathForRecoveryThroughEmail.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) =>
                    this.getFeatureComponent("webauthn-send-recovery-email", props, useComponentOverrides),
                recipeID: WebauthnRecipe.RECIPE_ID,
            };
        }
        return features;
    };

    getFeatureComponent = (
        componentName: "webauthn-recover-account" | "webauthn-send-recovery-email",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "webauthn-recover-account") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} doRedirection={false}>
                        <RecoverAccountUsingToken
                            recipe={this.recipeInstance}
                            {...props}
                            useComponentOverrides={useComponentOverrides}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        } else if (componentName === "webauthn-send-recovery-email") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} doRedirection={false}>
                        <SendRecoveryEmailForm
                            recipe={this.recipeInstance}
                            {...props}
                            useComponentOverrides={useComponentOverrides}
                        />
                    </SessionAuth>
                </UserContextWrapper>
            );
        }
        throw new Error("Should never come here.");
    };

    getAuthComponents(): AuthComponent[] {
        return [
            {
                type: "FULL_PAGE",
                async preloadInfoAndRunChecks(firstFactors, _, isSignUp) {
                    return {
                        shouldDisplay:
                            isSignUp && firstFactors.length === 1 && firstFactors.includes(FactorIds.WEBAUTHN),
                        preloadInfo: {},
                    };
                },
                component: (props) => (
                    <SignUpFeature
                        key="webauthnSignUpFullPage"
                        {...props}
                        recipe={this.recipeInstance}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                        factorIds={[FactorIds.WEBAUTHN]}
                    />
                ),
            },
            {
                type: "SIGN_UP" as const,
                factorIds: [FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: (props: PartialAuthComponentProps) => (
                    <SignUpWithPasskeyFeature
                        key="webauthn-sign-up"
                        {...props}
                        recipe={this.recipeInstance}
                        factorIds={[FactorIds.WEBAUTHN]}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                    />
                ),
            },
            {
                type: "SIGN_IN" as const,
                factorIds: [FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: (props: PartialAuthComponentProps) => (
                    <SignInWithPasskeyFeature
                        key="webauthn-sign-in"
                        {...props}
                        recipe={this.recipeInstance}
                        factorIds={[FactorIds.WEBAUTHN]}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                    />
                ),
            },
        ];
    }

    public requiresSignUpPage = true;

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        WebauthnPreBuiltUI.instance = undefined;
        return;
    }
}
