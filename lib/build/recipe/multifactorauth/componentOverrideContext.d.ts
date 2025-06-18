/// <reference types="react" />
import type { ComponentOverrideMap } from "./types";
declare const useContext: () => ComponentOverrideMap | ({
    MFAFactorChooserFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        logout: (() => void) | undefined;
    }>> | undefined;
    MFAFactorChooserHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        showBackButton: boolean;
        onBackButtonClicked: () => void;
    }>> | undefined;
    MFAFactorList_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        availableFactors: import("./types").SecondaryFactorRedirectionInfo[];
        navigateToFactor: (factorId: string) => void;
    }>> | undefined;
    MFAFactorOption_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        onClick: (() => void) | undefined;
        id: string;
        name: string;
        description: string;
        logo: import("react").FC<{}>;
    }>> | undefined;
} & ComponentOverrideMap) | ({
    EmailPasswordSignInForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").ThemeBaseProps & {
        formFields: Omit<import("../emailpassword/types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../emailpassword/types").NormalisedConfig;
        onForgotPasswordClick: () => void;
        onSuccess: (result: {
            user: import("supertokens-web-js/types").User;
        }) => void;
        userContext: import("../../types").UserContext;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }>> | undefined;
    EmailPasswordSignUpForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        clearError: () => void;
        onFetchError: (error: Response) => void;
        onError: (error: string) => void;
        config: import("../emailpassword/types").NormalisedConfig;
        signInClicked?: (() => void) | undefined;
        onSuccess: (result: {
            user: import("supertokens-web-js/types").User;
        }) => void;
        formFields: import("../emailpassword/types").FormFieldThemeProps[];
        error: string | undefined;
        userContext: import("../../types").UserContext;
    } & {
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    }>> | undefined;
    EmailPasswordResetPasswordEmail_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").ThemeBaseProps & {
        formFields: Omit<import("../emailpassword/types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../emailpassword/types").NormalisedConfig;
        onBackButtonClicked: () => void;
    } & {
        footer?: JSX.Element | undefined;
    } & {
        children?: import("react").ReactNode;
    }>> | undefined;
    EmailPasswordSubmitNewPassword_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").ThemeBaseProps & {
        formFields: Omit<import("../emailpassword/types").FormFieldThemeProps, "inputComponent">[];
        error: string | undefined;
    } & {
        recipeImplementation: import("supertokens-web-js/recipe/emailpassword").RecipeInterface;
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        config: import("../emailpassword/types").NormalisedConfig;
        onSignInClicked: () => void;
        token: string;
    } & {
        footer?: JSX.Element | undefined;
    } & {
        children?: import("react").ReactNode;
    }>> | undefined;
} & ComponentOverrideMap) | ({
    EmailVerificationSendVerifyEmail_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../emailverification/types").NormalisedConfig;
        signOut: () => Promise<void>;
        onEmailAlreadyVerified: () => Promise<void>;
        redirectToAuth: () => Promise<void>;
    } & {
        children?: import("react").ReactNode;
    }>> | undefined;
    EmailVerificationVerifyEmailLinkClicked_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").ThemeBaseProps & {
        recipeImplementation: import("supertokens-web-js/recipe/emailverification").RecipeInterface;
        config: import("../emailverification/types").NormalisedConfig;
        onSuccess: () => Promise<void>;
        onTokenInvalidRedirect: () => Promise<void>;
        token: string;
    } & {
        children?: import("react").ReactNode;
    }>> | undefined;
} & ComponentOverrideMap) | ({
    MultitenancyDynamicLoginMethodsSpinnerTheme_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<(props: {
        config: import("../multitenancy/types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element> | undefined;
} & ComponentOverrideMap) | ({
    OAuth2LogoutScreenInner_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        isLoggingOut: boolean;
        onLogoutClicked: () => void;
    }>> | undefined;
} & ComponentOverrideMap) | ({
    PasswordlessEmailForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").SignInUpEmailFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessPhoneForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").SignInUpPhoneFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessEmailOrPhoneForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").SignInUpEmailOrPhoneFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessEPComboEmailForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").SignInUpEPComboEmailFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessEPComboEmailOrPhoneForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").SignInUpEPComboEmailOrPhoneFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessUserInputCodeFormHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").UserInputCodeFormHeaderProps>> | undefined;
    PasswordlessUserInputCodeFormFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").UserInputCodeFormFooterProps>> | undefined;
    PasswordlessUserInputCodeForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").FC<import("../passwordless/types").SignInUpUserInputCodeFormProps & {
        footer?: JSX.Element | undefined;
    }>> | undefined;
    PasswordlessLinkSent_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").LinkSentThemeProps & {
        children?: import("react").ReactNode;
    }>> | undefined;
    PasswordlessLinkClickedScreen_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<(props: import("../passwordless/types").LinkClickedScreenProps) => import("react/jsx-runtime").JSX.Element> | undefined;
    PasswordlessContinueWithPasswordless_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<(props: import("../../types").AuthComponentProps & {
        config: import("../passwordless/types").NormalisedConfig;
        continueWithPasswordlessClicked: () => void;
    }) => import("react/jsx-runtime").JSX.Element> | undefined;
    PasswordlessMFAHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").MFAHeaderProps>> | undefined;
    PasswordlessMFAFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").MFAFooterProps>> | undefined;
    PasswordlessMFAOTPHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").MFAOTPHeaderProps>> | undefined;
    PasswordlessMFAOTPFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../passwordless/types").MFAOTPFooterProps>> | undefined;
    PasswordlessMFAOTPLoadingScreen_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        children?: import("react").ReactNode;
    }>> | undefined;
} & ComponentOverrideMap) | ({
    SessionAccessDenied_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").FC<import("../session/types").AccessDeniedThemeProps>> | undefined;
} & ComponentOverrideMap) | ({
    ThirdPartySignInAndUpProvidersForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../../types").AuthComponentProps & {
        providers: Pick<import("../thirdparty/providers").default, "id" | "getButton">[];
        recipeImplementation: import("../../types").WebJSRecipeInterface<typeof import("supertokens-web-js/lib/build/recipe/thirdparty")>;
        config: import("../thirdparty/types").NormalisedConfig;
    } & {
        children?: import("react").ReactNode;
    }>> | undefined;
    ThirdPartySignInAndUpCallbackTheme_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<(props: {
        config: import("../thirdparty/types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element> | undefined;
} & ComponentOverrideMap) | ({
    TOTPBlockedScreen_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        nextRetryAt: number;
        onRetry: () => void;
        onSignOutClicked: () => void;
    } & {
        children?: import("react").ReactNode;
    }>> | undefined;
    TOTPLoadingScreen_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        children?: import("react").ReactNode;
    }>> | undefined;
    TOTPCodeForm_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../totp/types").TOTPMFACommonProps & {
        onSuccess: () => void;
        clearError: () => void;
        onError: (err: string) => void;
        footer?: JSX.Element | undefined;
    }>> | undefined;
    TOTPCodeVerificationFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../totp/types").TOTPMFACommonProps & {
        onSignOutClicked: () => void;
    }>> | undefined;
    TOTPCodeVerificationHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../totp/types").TOTPMFACommonProps & {
        showBackButton: boolean;
        onBackButtonClicked: () => void;
    }>> | undefined;
    TOTPDeviceSetupFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../totp/types").TOTPMFACommonProps & {
        onSignOutClicked: () => void;
    }>> | undefined;
    TOTPDeviceSetupHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../totp/types").TOTPMFACommonProps & {
        showBackButton: boolean;
        onBackButtonClicked: () => void;
    }>> | undefined;
    TOTPDeviceInfoSection_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../totp/types").TOTPMFACommonProps & {
        deviceInfo: import("supertokens-web-js/recipe/totp").DeviceInfo;
        showSecret: boolean;
        onShowSecretClicked: () => void;
    }>> | undefined;
} & ComponentOverrideMap) | ({
    AuthPageHeader_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
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
    AuthPageFooter_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<{
        privacyPolicyLink?: string | undefined;
        termsOfServiceLink?: string | undefined;
        factorIds: string[];
        hasSeparateSignUpView: boolean;
        isSignUp: boolean;
    }>> | undefined;
    AuthPageComponentList_Override?: import("../../components/componentOverride/componentOverride").ComponentOverride<import("react").ComponentType<import("../authRecipe/types").AuthPageThemeProps>> | undefined;
} & ComponentOverrideMap), Provider: import("react").FC<import("react").PropsWithChildren<{
    components: ComponentOverrideMap;
}>>;
export { useContext as useRecipeComponentOverrideContext, Provider as RecipeComponentsOverrideContextProvider };
