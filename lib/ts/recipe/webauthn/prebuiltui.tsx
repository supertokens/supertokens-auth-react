import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest } from "../../utils";
import { FactorIds } from "../multifactorauth";
import { RecipeRouter } from "../recipeRouter";
import SessionAuth from "../session/sessionAuth";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import ContinueWithPasskeyFeature from "./components/features/continueWithPasskey";
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
    languageTranslations = {
        en: {},
    };

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
        componentName: "sign-up" | "sign-in",
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        componentName: "sign-up" | "sign-in",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
        _: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "sign-up") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <SessionAuth requireAuth={false} doRedirection={false}>
                        <div></div>
                    </SessionAuth>
                </UserContextWrapper>
            );
        } else if (componentName === "sign-in") {
            // TODO: Define this once sign-in is ready.
            return <div></div>;
        }
        throw new Error("Should never come here.");
    };

    getAuthComponents(): AuthComponent[] {
        const res: AuthComponent[] = [
            {
                type: "SIGN_UP" as const,
                factorIds: [FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: (props: PartialAuthComponentProps) => (
                    <ContinueWithPasskeyFeature
                        continueFor="SIGN_UP"
                        key="webauthn-sign-up"
                        {...props}
                        recipe={this.recipeInstance}
                        factorIds={[FactorIds.WEBAUTHN]}
                        useComponentOverrides={useRecipeComponentOverrideContext}
                    />
                ),
            },
        ];

        return res;
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
