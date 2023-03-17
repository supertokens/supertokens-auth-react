import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { UserContextContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import EmailVerificationRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap } from "../../types";

export class EmailVerificationPreBuiltUI extends RecipeRouter {
    constructor(private readonly recipeInstance: EmailVerificationRecipe) {
        super();
    }
    static instance?: EmailVerificationPreBuiltUI;

    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUI {
        if (EmailVerificationPreBuiltUI.instance === undefined) {
            const recipeInstance = EmailVerificationRecipe.getInstanceOrThrow();
            EmailVerificationPreBuiltUI.instance = new EmailVerificationPreBuiltUI(recipeInstance);
        }

        return EmailVerificationPreBuiltUI.instance;
    }
    static canHandleRoute(): boolean {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(): RecipeFeatureComponentMap {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getFeatureComponent(_: "emailverification", props: any): JSX.Element {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(_, props);
    }
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[] {
        return RecipeRouter.getRecipeRoutes(
            reactRouterDom,
            EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance()
        );
    }

    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("emailverification", props, useComponentOverrides),
            };
        }
        return features;
    };

    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: "emailverification",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        return (
            <UserContextWrapper userContext={props.userContext}>
                <SessionAuth requireAuth={false} overrideGlobalClaimValidators={() => []}>
                    {/**
                     * EmailVerificationFeature is a class component that accepts userContext
                     * as a prop. If we pass userContext as a prop directly then Emailverification
                     * will not respond to changes when the userContext in UserContextWrapper
                     * changes. In order to prevent this we use a Consumer that will respond
                     * to changes in UserContextWrapper and update the prop for EmailVerificationFeature
                     *
                     * NOTE: We cannot use static contextType in EmailVerificationFeature to solve
                     * this because EmailVerificationFeature already uses SessionContext as its
                     * context type. Read more here:
                     * https://reactjs.org/docs/context.html#consuming-multiple-contexts
                     */}
                    <UserContextContext.Consumer>
                        {(value) => {
                            return (
                                <EmailVerificationFeature
                                    recipe={this.recipeInstance}
                                    useComponentOverrides={useComponentOverrides}
                                    {...{
                                        ...props,
                                        // We do this to make sure it does not add another provider
                                        userContext: value,
                                    }}
                                />
                            );
                        }}
                    </UserContextContext.Consumer>
                </SessionAuth>
            </UserContextWrapper>
        );
    };

    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailVerificationPreBuiltUI.instance = undefined;
        return;
    }

    static EmailVerification = (props?: any) =>
        EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("emailverification", props);
    static EmailVerificationTheme = EmailVerificationTheme;
}

const EmailVerification = EmailVerificationPreBuiltUI.canHandleRoute;

export { EmailVerification };
