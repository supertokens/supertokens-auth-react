import * as React from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { Fragment } from "react";
import { defaultEmailValidator } from "../../../../emailpassword/validators";
import Button from "../../../../emailpassword/components/library/button";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import PasskeyIcon from "../../../../../components/assets/passkeyIcon";
import { WebAuthnMFAProps } from "../../../types";
import SuperTokens from "../../../../../superTokens";
import FormBase from "../../../../emailpassword/components/library/formBase";
import { Label } from "../../../../emailpassword/components/library";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";
import BackButton from "../../../../emailpassword/components/library/backButton";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { PasskeyFeatureBlockList } from "../signUp/featureBlocks";
import { PasskeyNotSupportedError } from "../error/passkeyNotSupportedError";

export enum MFAScreens {
    SignIn,
    SignUp,
    SignUpConfirmation,
}

function MFAThemeWrapper(props: WebAuthnMFAProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle]}>
                <MFATheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default MFAThemeWrapper;

export function MFATheme(props: WebAuthnMFAProps): JSX.Element {
    const { onBackButtonClicked, onSignIn } = props;
    const [activeScreen, setActiveScreen] = React.useState<MFAScreens>(MFAScreens.SignIn);
    const [signUpEmail, setSignUpEmail] = React.useState<string>("");

    const onRegisterPasskeyClick = React.useCallback(() => {
        if (props.featureState.email) {
            setActiveScreen(MFAScreens.SignUpConfirmation);
        } else {
            setActiveScreen(MFAScreens.SignUp);
        }
    }, [props.featureState.email]);

    const onSignUpContinue = React.useCallback((email: string) => {
        setActiveScreen(MFAScreens.SignUpConfirmation);
        setSignUpEmail(email);
    }, []);

    const clearError = React.useCallback(() => {
        props.dispatch({ type: "setError", error: undefined });
    }, [props]);

    const onError = React.useCallback(
        (error: string) => {
            props.dispatch({ type: "setError", error });
        },
        [props]
    );

    const onClickSignUpBackButton = React.useCallback(() => {
        setActiveScreen(MFAScreens.SignIn);
    }, []);

    const onClickSignUpConfirmationBackButton = React.useCallback(() => {
        if (props.featureState.email) {
            setActiveScreen(MFAScreens.SignIn);
        } else {
            setActiveScreen(MFAScreens.SignUp);
        }
    }, [props.featureState.email]);

    const onFetchError = React.useCallback(() => {
        onError("SOMETHING_WENT_WRONG_ERROR");
    }, [onError]);

    if (!props.featureState.loaded) {
        return <WebauthnMFALoadingScreen />;
    }

    return (
        <div data-supertokens="container webauthn-mfa">
            <div data-supertokens="row">
                {activeScreen === MFAScreens.SignIn ? (
                    <WebauthnMFASignIn
                        onBackButtonClicked={props.featureState.showBackButton ? onBackButtonClicked : undefined}
                        onSignIn={onSignIn}
                        error={props.featureState.error}
                        onRegisterPasskeyClick={onRegisterPasskeyClick}
                        deviceSupported={props.featureState.deviceSupported}
                    />
                ) : activeScreen === MFAScreens.SignUp ? (
                    <WebauthnMFASignUp
                        clearError={clearError}
                        onError={onError}
                        onFetchError={onFetchError}
                        error={props.featureState.error}
                        onContinueClick={onSignUpContinue}
                        email={signUpEmail}
                        onRecoverAccountClick={props.onRecoverAccountClick}
                        onBackButtonClicked={onClickSignUpBackButton}
                    />
                ) : (
                    <WebauthnMFASignUpConfirmation
                        onSignUp={props.onSignUp}
                        onBackButtonClicked={onClickSignUpConfirmationBackButton}
                        email={props.featureState.email || signUpEmail}
                        error={props.featureState.error}
                    />
                )}
            </div>
            <SuperTokensBranding />
        </div>
    );
}

export const WebauthnMFALoadingScreen = withOverride("WebauthnMFALoadingScreen", function WebauthnMFALoadingScreen() {
    return (
        <div data-supertokens="container delayedRender pwless-mfa loadingScreen">
            <div data-supertokens="row">
                <div data-supertokens="spinner delayedRender">
                    <SpinnerIcon />
                </div>
            </div>
        </div>
    );
});

type MFASignInProps = {
    onBackButtonClicked?: () => void;
    onSignIn: () => Promise<void>;
    onRegisterPasskeyClick: () => void;
    error: string | undefined;
    deviceSupported: boolean;
};

export const WebauthnMFASignIn = withOverride(
    "WebauthnMFASignIn",
    function WebauthnMFASignIn(props: MFASignInProps): JSX.Element {
        const t = useTranslation();
        const [isLoading, setIsLoading] = React.useState(false);

        const onClick = React.useCallback(async () => {
            setIsLoading(true);
            await props.onSignIn();
            setIsLoading(false);
        }, [props]);

        return (
            <Fragment>
                {props.onBackButtonClicked ? (
                    <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                        <BackButton onClick={props.onBackButtonClicked} />
                        {t("WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE")}
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    </div>
                ) : (
                    <div data-supertokens="headerTitle ebauthn-mfa">{t("WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE")}</div>
                )}
                <div data-supertokens="headerSubtitle secondaryText">{t("WEBAUTHN_MFA_SIGN_IN_HEADER_SUBTITLE")}</div>
                <Button
                    disabled={!props.deviceSupported || isLoading}
                    isLoading={isLoading}
                    type="button"
                    onClick={onClick}
                    label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
                    isGreyedOut={!props.deviceSupported}
                    icon={PasskeyIcon}
                />
                {props.error !== undefined && <GeneralError error={props.error} />}
                <div data-supertokens="passkeyMfaSignInDivider">
                    <div data-supertokens="divider" />
                    <span>or</span>
                    <div data-supertokens="divider" />
                </div>
                <div data-supertokens="headerSubtitle secondaryText">
                    <span data-supertokens="link" onClick={props.onRegisterPasskeyClick}>
                        {t("WEBAUTHN_MFA_REGISTER_PASSKEY_LINK")}
                    </span>
                    {t("WEBAUTHN_MFA_REGISTER_PASSKEY_SUBTITLE")}
                </div>
                {!props.deviceSupported && <PasskeyNotSupportedError />}
            </Fragment>
        );
    }
);

type MFASignUpProps = {
    onContinueClick: (email: string) => void;
    clearError: () => void;
    email?: string;
    error?: string;
    onError: (error: string) => void;
    onFetchError?: (error: Response) => void;
    onRecoverAccountClick: () => void;
    onBackButtonClicked: () => void;
};

export const WebauthnMFASignUp = withOverride(
    "WebauthnMFASignUp",
    function WebauthnMFASignUp(props: MFASignUpProps): JSX.Element {
        const t = useTranslation();

        const onSuccess = React.useCallback(
            ({ email }: { email: string }) => {
                props.onContinueClick(email);
            },
            [props.onContinueClick]
        );

        return (
            <Fragment>
                <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                    <BackButton onClick={props.onBackButtonClicked} />
                    {t("WEBAUTHN_MFA_REGISTER_PASSKEY_LINK")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                {props.error !== undefined && <GeneralError error={props.error} />}
                <div data-supertokens="signUpFormInnerContainer">
                    <div data-supertokens="cautionMessage">{t("WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL")}</div>
                    <FormBase
                        clearError={props.clearError}
                        onFetchError={props.onFetchError}
                        onError={props.onError}
                        formFields={[
                            {
                                id: "email",
                                label: "",
                                labelComponent: (
                                    <div data-supertokens="formLabelWithLinkWrapper">
                                        <Label value={"WEBAUTHN_SIGN_UP_LABEL"} data-supertokens="emailInputLabel" />
                                        <a
                                            onClick={props.onRecoverAccountClick}
                                            data-supertokens="link linkButton formLabelLinkBtn recoverAccountTrigger">
                                            {t("WEBAUTHN_RECOVER_ACCOUNT_LABEL")}
                                        </a>
                                    </div>
                                ),
                                optional: false,
                                autofocus: true,
                                placeholder: "",
                                getDefaultValue: () => props.email as string,
                                autoComplete: "email",
                                // We are using the default validator that allows any string
                                validate: defaultEmailValidator,
                            },
                        ]}
                        buttonLabel={"WEBAUTHN_EMAIL_CONTINUE_BUTTON"}
                        onSuccess={onSuccess}
                        callAPI={async (formFields) => {
                            const email = formFields.find((field) => field.id === "email")?.value;
                            if (email === undefined) {
                                throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                            }

                            if (email === "") {
                                throw new STGeneralError("EMAIL_INPUT_NOT_POPULATED_ERROR");
                            }

                            // We do not want the form to make the API call since we have
                            // an intermediary step here so we will just mock an OK status
                            // to render the next step.
                            return {
                                status: "OK",
                                email,
                            };
                        }}
                        validateOnBlur={false}
                        showLabels={true}
                        footer={undefined}
                    />
                </div>
            </Fragment>
        );
    }
);

type MFASignUpConfirmationProps = {
    onSignUp: (email: string) => Promise<void>;
    onBackButtonClicked: () => void;
    email: string;
    error?: string;
};

export const WebauthnMFASignUpConfirmation = withOverride(
    "WebauthnMFASignUpConfirmation",
    function WebauthnMFASignUpConfirmation(props: MFASignUpConfirmationProps): JSX.Element {
        const t = useTranslation();
        const [isLoading, setIsLoading] = React.useState(false);

        const onClick = React.useCallback(async () => {
            setIsLoading(true);
            await props.onSignUp(props.email);
            setIsLoading(false);
        }, [props]);

        return (
            <Fragment>
                <div data-supertokens="headerTitle withBackButton webauthn-mfa">
                    <BackButton onClick={props.onBackButtonClicked} />
                    {t("WEBAUTHN_MFA_REGISTER_PASSKEY_LINK")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                <div data-supertokens="divider" />
                <div data-supertokens="passkeyConfirmationContainer">
                    <div data-supertokens="passkeyConfirmationEmailContainer">
                        <div data-supertokens="continueWithLabel">{t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT")}</div>
                        <div data-supertokens="enteredEmailId">{props.email}</div>
                    </div>
                    <PasskeyFeatureBlockList />
                    {props.error !== undefined && <GeneralError error={props.error} />}
                    <div data-supertokens="passkeyConfirmationFooter">
                        <Button
                            disabled={isLoading}
                            isLoading={isLoading}
                            type="button"
                            onClick={onClick}
                            label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
                            isGreyedOut={false}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
);
