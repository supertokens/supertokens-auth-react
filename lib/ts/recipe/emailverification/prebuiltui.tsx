import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { UserContextContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { RecipeRouter } from "../recipeRouter";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import { defaultTranslationsEmailVerification } from "./components/themes/translations";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import EmailVerificationRecipe from "./recipe";

import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";

export class EmailVerificationPreBuiltUI extends RecipeRouter {
    static instance?: EmailVerificationPreBuiltUI;
    languageTranslations = defaultTranslationsEmailVerification;
    static languageTranslations = defaultTranslationsEmailVerification;

    constructor(public readonly recipeInstance: EmailVerificationRecipe) {
        super();
    }

    // Static methods
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUI {
        if (EmailVerificationPreBuiltUI.instance === undefined) {
            const recipeInstance = EmailVerificationRecipe.getInstanceOrThrow();
            EmailVerificationPreBuiltUI.instance = new EmailVerificationPreBuiltUI(recipeInstance);
        }

        return EmailVerificationPreBuiltUI.instance;
    }
    static getFeatures(
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    }
    static getFeatureComponent(
        componentName: "emailverification",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
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
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("emailverification", props, useComponentOverrides),
                recipeID: EmailVerificationRecipe.RECIPE_ID,
            };
        }
        return features;
    };
    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: "emailverification",
        props: FeatureBaseProps<{ userContext?: UserContext }>,
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

    getAuthComponents(): AuthComponent[] {
        return [];
    }

    // For tests
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailVerificationPreBuiltUI.instance = undefined;
        return;
    }

    static EmailVerification = (props: FeatureBaseProps<{ userContext?: UserContext }>) =>
        EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("emailverification", props);
    static EmailVerificationTheme = EmailVerificationTheme;
}

const EmailVerification = EmailVerificationPreBuiltUI.EmailVerification;

export { EmailVerification, EmailVerificationTheme };
