/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import WebauthnRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { AuthComponent, FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
export declare class WebauthnPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: WebauthnRecipe;
    static instance?: WebauthnPreBuiltUI;
    languageTranslations: {
        en: {
            WEBAUTHN_EMAIL_CONTINUE_BUTTON: string;
            WEBAUTHN_SIGN_UP_LABEL: string;
            WEBAUTHN_RECOVER_ACCOUNT_LABEL: string;
            WEBAUTHN_RECOVER_ACCOUNT_SUBHEADER_LABEL: string;
            WEBAUTHN_CONTINUE_WITHOUT_PASSKEY_BUTTON: string;
            WEBAUTHN_CREATE_A_PASSKEY_HEADER: string;
            WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT: string;
            WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON: string;
            WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD: string;
            WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD_DETAIL: string;
            WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES: string;
            WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES_DETAIL: string;
            WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER: string;
            WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER_DETAIL: string;
            WEBAUTHN_PASSKEY_RECOVERABLE_ERROR: string;
            WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR: string;
            WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL: string;
            WEBAUTHN_UNRECOVERABLE_ERROR: string;
            WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS: string;
            WEBAUTHN_EMAIL_SENT_LABEL: string;
            WEBAUTHN_EMAIL_SENT_LABEL_PRE_EMAIL: string;
            WEBAUTHN_EMAIL_SENT_LABEL_POST_EMAIL: string;
            WEBAUTHN_RESEND_OR_CHANGE_EMAIL_LABEL: string;
            WEBAUTHN_ACCOUNT_RECOVERY_NOT_ALLOWED_LABEL: string;
            WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR: string;
            WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL: string;
            WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR: string;
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR: string;
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR: string;
            WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR: string;
            WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL: string;
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_CREDENTIALS_ERROR: string;
            WEBAUTHN_ACCOUNT_RECOVERY_GENERATED_OPTIONS_NOT_FOUND_ERROR: string;
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_AUTHENTICATOR_ERROR: string;
            WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR: string;
            WEBAUTHN_NOT_SUPPORTED_ERROR: string;
            WEBAUTHN_PASSKEY_NOT_SUPPORTED_BY_BROWSER: string;
            WEBAUTHN_EMAIL_INPUT_NOT_POPULATED_ERROR: string;
            WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE: string;
            WEBAUTHN_MFA_SIGN_IN_HEADER_SUBTITLE: string;
            WEBAUTHN_MFA_DIVIDER: string;
            WEBAUTHN_MFA_REGISTER_PASSKEY_SUBTITLE: string;
            WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE: string;
            WEBAUTHN_MFA_FOOTER_LOGOUT: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_UP: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN_UP_TO_APP: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END: string;
            AUTH_PAGE_FOOTER_START: string;
            AUTH_PAGE_FOOTER_TOS: string;
            AUTH_PAGE_FOOTER_AND: string;
            AUTH_PAGE_FOOTER_PP: string;
            AUTH_PAGE_FOOTER_END: string;
            DIVIDER_OR: string;
            BRANDING_POWERED_BY_START: string;
            BRANDING_POWERED_BY_END: string;
            SOMETHING_WENT_WRONG_ERROR: string;
            SOMETHING_WENT_WRONG_ERROR_RELOAD: string;
        };
    };
    constructor(recipeInstance: WebauthnRecipe);
    static getInstanceOrInitAndGetInstance(): WebauthnPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "webauthn-recover-account" | "webauthn-send-recovery-email",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "webauthn-recover-account" | "webauthn-send-recovery-email" | "webauthn-mfa",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    requiresSignUpPage: boolean;
    static reset(): void;
}
