import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest } from "../../utils";
import { RecipeRouter } from "../recipeRouter";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import AccessDeniedScreenFeature from "./components/features/accessDeniedScreen";
import { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import Session from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren, ReactElement } from "react";

export class SessionPreBuiltUI extends RecipeRouter {
    static instance?: SessionPreBuiltUI;
    constructor(public readonly recipeInstance: Session) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): SessionPreBuiltUI {
        if (SessionPreBuiltUI.instance === undefined) {
            const recipeInstance = Session.getInstanceOrThrow();
            SessionPreBuiltUI.instance = new SessionPreBuiltUI(recipeInstance);
        }

        return SessionPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return SessionPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "accessDenied",
        props: FeatureBaseProps & { error?: string; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return SessionPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    }

    // Instance methods
    getFeatures = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        return {};
    };
    getFeatureComponent = (
        componentName: "accessDenied",
        props: FeatureBaseProps & { useShadowDom?: boolean; error?: string; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "accessDenied") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <AccessDeniedScreenFeature
                        recipe={this.recipeInstance}
                        useComponentOverrides={useComponentOverrides}
                        error={props.error}
                        useShadowDom={props.useShadowDom}
                    />
                </UserContextWrapper>
            );
        }
        throw new Error("Should never come here.");
    };

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        SessionPreBuiltUI.instance = undefined;
        return;
    }

    static AccessDeniedScreen = (
        prop: PropsWithChildren<{ useShadowDom?: boolean; error?: string; userContext?: any }> = {}
    ): ReactElement => this.getFeatureComponent("accessDenied", prop);

    static AccessDeniedScreenTheme = AccessDeniedScreenTheme;
}

const AccessDeniedScreen = SessionPreBuiltUI.AccessDeniedScreen;

export { AccessDeniedScreen, AccessDeniedScreenTheme };
