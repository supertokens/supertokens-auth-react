import * as React from "react";
import { WebAuthnMFAProps } from "../../../types";
import SuperTokens from "../../../../../superTokens";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { useTranslation } from "../../../../../translation/translationContext";
import { AccessDeniedScreen } from "../../../../session/prebuiltui";
import { ThemeBase } from "../themeBase";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { WebauthnMFALoadingScreen } from "./loadingScreen";
import { WebauthnMFASignIn } from "./signIn";
import { WebauthnMFASignUp } from "./signUp";
import { WebauthnMFASignUpConfirmation } from "./signUpConfirmation";

export { WebauthnMFALoadingScreen, WebauthnMFASignIn, WebauthnMFASignUp, WebauthnMFASignUpConfirmation };
export type { MFASignInProps } from "./signIn";
export type { MFASignUpProps } from "./signUp";
export type { MFASignUpConfirmationProps } from "./signUpConfirmation";

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
    const t = useTranslation();

    const onRegisterPasskeyClick = React.useCallback(() => {
        if (!props.featureState.canRegisterPasskey) return;
        if (props.featureState.email) {
            setActiveScreen(MFAScreens.SignUpConfirmation);
        } else {
            setActiveScreen(MFAScreens.SignUp);
        }
    }, [props.featureState.email, props.featureState.canRegisterPasskey]);

    const onSignUpContinue = React.useCallback(
        (email: string) => {
            if (!props.featureState.canRegisterPasskey) return;
            setActiveScreen(MFAScreens.SignUpConfirmation);
            setSignUpEmail(email);
        },
        [props.featureState.canRegisterPasskey]
    );

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
        if (!props.featureState.canRegisterPasskey) return;
        setActiveScreen(MFAScreens.SignIn);
    }, [props.featureState.canRegisterPasskey]);

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

    if (props.featureState.accessDenied) {
        return (
            <AccessDeniedScreen
                useShadowDom={false /* We set this to false, because we are already inside a shadowDom (if required) */}
                error={t(props.featureState.error!)}
            />
        );
    }

    return (
        <div data-supertokens="container webauthn-mfa">
            <div data-supertokens="row">
                {activeScreen === MFAScreens.SignIn ? (
                    <WebauthnMFASignIn
                        onBackButtonClicked={props.featureState.showBackButton ? onBackButtonClicked : undefined}
                        canRegisterPasskey={props.featureState.canRegisterPasskey}
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
