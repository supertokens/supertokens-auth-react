import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest } from "../../utils";
import { FactorIds } from "../multifactorauth";
import { RecipeRouter } from "../recipeRouter";
import SessionAuth from "../session/sessionAuth";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInWithPasskeyFeature from "./components/features/signIn";
import { defaultTranslationsWebauthn } from "./components/themes/translations";
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
        componentName: "webauthn-sign-up",
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
        _: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        // TODO: Define after components are defined
        return features;
    };

    getFeatureComponent = (
        componentName: "webauthn-sign-up",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
        _: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "webauthn-sign-up") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} doRedirection={false}>
                        <div></div>
                    </SessionAuth>
                </UserContextWrapper>
            );
        }
        throw new Error("Should never come here.");
    };

    getAuthComponents(): AuthComponent[] {
        return [
            {
                type: "SIGN_UP" as const,
                factorIds: [FactorIds.WEBAUTHN],
                displayOrder: 4,
                /* TODO: Update the following to be sign up instead of sign in */
                component: (props: PartialAuthComponentProps) => (
                    <SignInWithPasskeyFeature
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

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        WebauthnPreBuiltUI.instance = undefined;
        return;
    }
}
