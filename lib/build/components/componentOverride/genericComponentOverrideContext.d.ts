import React from "react";
import type { AllRecipeComponentOverrides } from "../../types";
export declare const createGenericComponentsOverrideContext: <T extends Record<string, unknown>>(v: T | undefined, key: keyof AllRecipeComponentOverrides) => readonly [() => T | ({
    EmailPasswordSignInForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").ThemeBaseProps & {
        formFields: Omit<import("../../recipe/emailpassword/types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../../recipe/emailpassword/types").NormalisedConfig;
        onForgotPasswordClick: () => void;
        onSuccess: (result: {
            user: import("supertokens-web-js/types").User;
        }) => void;
        userContext: import("../../types").UserContext;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }>> | undefined;
    EmailPasswordSignUpForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../../recipe/emailpassword/types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: (result: {
            user: import("supertokens-web-js/types").User;
        }) => void;
        formFields: import("../../recipe/emailpassword/types").FormFieldThemeProps[];
        error: string | undefined;
        userContext: import("../../types").UserContext;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }>> | undefined;
    EmailPasswordResetPasswordEmail_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").ThemeBaseProps & {
        formFields: Omit<import("../../recipe/emailpassword/types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../../recipe/emailpassword/types").NormalisedConfig;
        onBackButtonClicked: () => void;
    } & {
        children?: React.ReactNode;
    }>> | undefined;
    EmailPasswordSubmitNewPassword_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").ThemeBaseProps & {
        formFields: Omit<import("../../recipe/emailpassword/types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../../recipe/emailpassword/types").NormalisedConfig;
        onSignInClicked: () => void;
        token: string;
    } & {
        children?: React.ReactNode;
    }>> | undefined;
} & T) | ({
    EmailVerificationSendVerifyEmail_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../../recipe/emailverification/types").NormalisedConfig;
        signOut: () => Promise<void>;
        onEmailAlreadyVerified: () => Promise<void>;
        redirectToAuth: () => Promise<void>;
    } & {
        children?: React.ReactNode;
    }>> | undefined;
    EmailVerificationVerifyEmailLinkClicked_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../../recipe/emailverification/types").NormalisedConfig;
        onSuccess: () => Promise<void>;
        onTokenInvalidRedirect: () => Promise<void>;
        token: string;
    } & {
        children?: React.ReactNode;
    }>> | undefined;
} & T) | ({
    MFAFactorChooserFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        logout: (() => void) | undefined;
    }>> | undefined;
    MFAFactorChooserHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        showBackButton: boolean;
        onBackButtonClicked: () => void;
    }>> | undefined;
    MFAFactorList_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        availableFactors: import("../../recipe/multifactorauth/types").SecondaryFactorRedirectionInfo[];
        navigateToFactor: (factorId: string) => void;
    }>> | undefined;
    MFAFactorOption_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        onClick: (() => void) | undefined;
        id: string;
        name: string;
        description: string;
        logo: React.FC<{}>;
    }>> | undefined;
} & T) | ({
    MultitenancyDynamicLoginMethodsSpinnerTheme_Override?: import("./componentOverride").ComponentOverride<(props: {
        config: import("../../recipe/multitenancy/types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element> | undefined;
} & T) | ({
    OAuth2LogoutScreenInner_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        isLoggingOut: boolean;
        onLogoutClicked: () => void;
    }>> | undefined;
} & T) | ({
    PasswordlessEmailForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").SignInUpEmailFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessPhoneForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").SignInUpPhoneFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessEmailOrPhoneForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").SignInUpEmailOrPhoneFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessEPComboEmailForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").SignInUpEPComboEmailFormProps>> | undefined;
    PasswordlessEPComboEmailOrPhoneForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").SignInUpEPComboEmailOrPhoneFormProps>> | undefined;
    PasswordlessUserInputCodeFormHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").UserInputCodeFormHeaderProps>> | undefined;
    PasswordlessUserInputCodeFormFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").UserInputCodeFormFooterProps>> | undefined;
    PasswordlessUserInputCodeForm_Override?: import("./componentOverride").ComponentOverride<React.FC<import("../../recipe/passwordless/types").SignInUpUserInputCodeFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessLinkSent_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").LinkSentThemeProps & {
        children?: React.ReactNode;
    }>> | undefined;
    PasswordlessLinkClickedScreen_Override?: import("./componentOverride").ComponentOverride<(props: import("../../recipe/passwordless/types").LinkClickedScreenProps) => import("react/jsx-runtime").JSX.Element> | undefined;
    PasswordlessContinueWithPasswordless_Override?: import("./componentOverride").ComponentOverride<(props: import("../../types").AuthComponentProps & {
        config: import("../../recipe/passwordless/types").NormalisedConfig;
        continueWithPasswordlessClicked: () => void;
    }) => import("react/jsx-runtime").JSX.Element> | undefined;
    PasswordlessMFAHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").MFAHeaderProps>> | undefined;
    PasswordlessMFAFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").MFAFooterProps>> | undefined;
    PasswordlessMFAOTPHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").MFAOTPHeaderProps>> | undefined;
    PasswordlessMFAOTPFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/passwordless/types").MFAOTPFooterProps>> | undefined;
    PasswordlessMFAOTPLoadingScreen_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        children?: React.ReactNode;
    }>> | undefined;
} & T) | ({
    SessionAccessDenied_Override?: import("./componentOverride").ComponentOverride<React.FC<import("../../recipe/session/types").AccessDeniedThemeProps>> | undefined;
} & T) | ({
    ThirdPartySignInAndUpProvidersForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../types").AuthComponentProps & {
        providers: Pick<import("../../recipe/thirdparty/providers").default, "id" | "getButton">[];
        recipeImplementation: import("../../types").WebJSRecipeInterface<typeof import("supertokens-web-js/lib/build/recipe/thirdparty")>;
        config: import("../../recipe/thirdparty/types").NormalisedConfig;
    } & {
        children?: React.ReactNode;
    }>> | undefined;
    ThirdPartySignInAndUpCallbackTheme_Override?: import("./componentOverride").ComponentOverride<(props: {
        config: import("../../recipe/thirdparty/types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element> | undefined;
} & T) | ({
    TOTPBlockedScreen_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        nextRetryAt: number;
        onRetry: () => void;
        onSignOutClicked: () => void;
    } & {
        children?: React.ReactNode;
    }>> | undefined;
    TOTPLoadingScreen_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        children?: React.ReactNode;
    }>> | undefined;
    TOTPCodeForm_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/totp/types").TOTPMFACommonProps & {
        onSuccess: () => void;
        clearError: () => void;
        onError: (err: string) => void;
        footer?: JSX.Element | undefined;
    }>> | undefined;
    TOTPCodeVerificationFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/totp/types").TOTPMFACommonProps & {
        onSignOutClicked: () => void;
    }>> | undefined;
    TOTPCodeVerificationHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/totp/types").TOTPMFACommonProps & {
        showBackButton: boolean;
        onBackButtonClicked: () => void;
    }>> | undefined;
    TOTPDeviceSetupFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/totp/types").TOTPMFACommonProps & {
        onSignOutClicked: () => void;
    }>> | undefined;
    TOTPDeviceSetupHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/totp/types").TOTPMFACommonProps & {
        showBackButton: boolean;
        onBackButtonClicked: () => void;
    }>> | undefined;
    TOTPDeviceInfoSection_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../recipe/totp/types").TOTPMFACommonProps & {
        deviceInfo: import("supertokens-web-js/recipe/totp").DeviceInfo;
        showSecret: boolean;
        onShowSecretClicked: () => void;
    }>> | undefined;
} & T) | ({
    AuthPageHeader_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        factorIds: string[];
        isSignUp: boolean;
        hasSeparateSignUpView: boolean;
        onSignInUpSwitcherClick: (() => void) | undefined;
        resetFactorList: () => void;
        showBackButton: boolean;
        oauth2ClientInfo?: {
            logoUri?: string | undefined;
            clientUri?: string | undefined;
            clientName: string;
        } | undefined;
    }>> | undefined;
    AuthPageFooter_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<{
        privacyPolicyLink?: string | undefined;
        termsOfServiceLink?: string | undefined;
        factorIds: string[];
        hasSeparateSignUpView: boolean;
        isSignUp: boolean;
    }>> | undefined;
    AuthPageComponentList_Override?: import("./componentOverride").ComponentOverride<React.ComponentType<import("../../ui").AuthPageThemeProps>> | undefined;
} & T), React.FC<React.PropsWithChildren<{
    components: T;
}>>, React.Consumer<T>];
