import { RecipeFeatureComponentMap } from "../../types";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import { SessionAuth } from "../session";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { UserContextContext } from "../../usercontext";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import { RecipeRoutes } from "../recipeRoutes";
import EmailVerification from "./recipe";

export class EmailVerificationPreBuiltUIRoutes extends RecipeRoutes {
    constructor(private readonly recipeInstance: EmailVerification) {
        super();
    }
    static instance: EmailVerificationPreBuiltUIRoutes;

    static init(recipeInstance: EmailVerification): void {
        EmailVerificationPreBuiltUIRoutes.instance = new EmailVerificationPreBuiltUIRoutes(recipeInstance);
    }
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUIRoutes {
        if (EmailVerificationPreBuiltUIRoutes.instance === undefined) {
            const recipeInstance = EmailVerification.getInstanceOrThrow();
            EmailVerificationPreBuiltUIRoutes.init(recipeInstance);
        }

        return EmailVerificationPreBuiltUIRoutes.instance;
    }
    static canHandleRoute(): boolean {
        return EmailVerificationPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().canHandleRoute();
    }
    static getRoutingComponent(): JSX.Element | null {
        return EmailVerificationPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getRoutingComponent();
    }
    static getFeatures(): RecipeFeatureComponentMap {
        return EmailVerificationPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatures();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getFeatureComponent(_: "emailverification", props: any): JSX.Element {
        return EmailVerificationPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent(_, props);
    }
    static getRoutes(reactRouterDom: any): JSX.Element[] {
        return super.getRoutes(reactRouterDom, EmailVerificationPreBuiltUIRoutes.getInstanceOrInitAndGetInstance());
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.recipeInstance.config.disableDefaultUI !== true) {
            const normalisedFullPath = this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeInstance.config.recipeId),
                component: (props: any) => this.getFeatureComponent("emailverification", props),
            };
        }
        return features;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFeatureComponent = (_: "emailverification", props: any): JSX.Element => {
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

    static EmailVerification = (props?: any) =>
        EmailVerificationPreBuiltUIRoutes.getInstanceOrInitAndGetInstance().getFeatureComponent(
            "emailverification",
            props
        );
    static EmailVerificationTheme = EmailVerificationTheme;
}
