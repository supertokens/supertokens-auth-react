import * as React from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { AccessDeniedScreen } from "../../../../session/prebuiltui";
import { ThemeBase } from "../themeBase";

import { WebauthnMFALoadingScreen } from "./loadingScreen";
import { WebauthnMFASignIn } from "./signIn";
import { WebauthnMFASignUp } from "./signUp";
import { WebauthnMFASignUpConfirmation } from "./signUpConfirmation";

import type { WebAuthnMFAProps } from "../../../types";

export { WebauthnMFALoadingScreen, WebauthnMFASignIn, WebauthnMFASignUp, WebauthnMFASignUpConfirmation };

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
    const t = useTranslation();

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
                <MFAThemeRouter {...props} />
            </div>
            <SuperTokensBranding />
        </div>
    );
}

function MFAThemeRouter(props: WebAuthnMFAProps): JSX.Element {
    const { onBackButtonClicked, onSignIn } = props;
    const [activeScreen, setActiveScreen] = React.useState<MFAScreens>(() => {
        if (!props.featureState.hasRegisteredPassKey) {
            return props.featureState.email ? MFAScreens.SignUpConfirmation : MFAScreens.SignUp;
        }
        return MFAScreens.SignIn;
    });
    const [email, setEmail] = React.useState<string>("");
    const signUpEmail = props.featureState.email || email;

    const onSignUpContinue = React.useCallback(
        (email: string) => {
            if (!props.featureState.canRegisterPasskey) {
                return;
            }
            setActiveScreen(MFAScreens.SignUpConfirmation);
            setEmail(email);
        },
        [props.featureState.canRegisterPasskey]
    );

    const onRegisterPasskeyClick = React.useCallback(() => {
        if (!props.featureState.canRegisterPasskey) {
            return;
        }
        if (props.featureState.email) {
            setActiveScreen(MFAScreens.SignUpConfirmation);
        } else {
            setActiveScreen(MFAScreens.SignUp);
        }
    }, [props.featureState.email, props.featureState.canRegisterPasskey]);

    const clearError = React.useCallback(() => {
        props.dispatch({ type: "setError", error: undefined });
    }, [props]);

    const onError = React.useCallback(
        (error: string) => {
            props.dispatch({ type: "setError", error });
        },
        [props]
    );

    const onClickSignUpConfirmationBackButton = React.useCallback(() => {
        if (!props.featureState.email) {
            setActiveScreen(MFAScreens.SignUp);
            return;
        }
        if (!props.featureState.hasRegisteredPassKey && !props.featureState.showBackButton) {
            return;
        }
        if (!props.featureState.hasRegisteredPassKey) {
            onBackButtonClicked();
            return;
        }
        setActiveScreen(MFAScreens.SignIn);
    }, [
        props.featureState.email,
        props.featureState.hasRegisteredPassKey,
        props.featureState.showBackButton,
        onBackButtonClicked,
    ]);

    const showBackButtonOnSignUpConfirmation = React.useMemo(() => {
        return (
            !!props.featureState.email || props.featureState.hasRegisteredPassKey || props.featureState.showBackButton
        );
    }, [props.featureState.email, props.featureState.hasRegisteredPassKey, props.featureState.showBackButton]);

    const onSignUp = React.useCallback(async () => {
        await props.onSignUp(signUpEmail);
    }, [props.onSignUp, signUpEmail]);

    const onFetchError = React.useCallback(() => {
        onError("SOMETHING_WENT_WRONG_ERROR");
    }, [onError]);

    const onClickSignUpBackButton = React.useCallback(() => {
        if (!props.featureState.hasRegisteredPassKey && !props.featureState.showBackButton) {
            return;
        }
        if (!props.featureState.hasRegisteredPassKey) {
            onBackButtonClicked();
            return;
        }
        setActiveScreen(MFAScreens.SignIn);
    }, [props.featureState.hasRegisteredPassKey, props.featureState.showBackButton, onBackButtonClicked]);

    const showBackButtonOnSignUp = React.useMemo(() => {
        return props.featureState.hasRegisteredPassKey || props.featureState.showBackButton;
    }, [props.featureState.email, props.featureState.showBackButton]);

    if (activeScreen === MFAScreens.SignUp) {
        return (
            <WebauthnMFASignUp
                clearError={clearError}
                onError={onError}
                onFetchError={onFetchError}
                error={props.featureState.error}
                onContinueClick={onSignUpContinue}
                email={email}
                onRecoverAccountClick={props.onRecoverAccountClick}
                onBackButtonClicked={showBackButtonOnSignUp ? onClickSignUpBackButton : undefined}
            />
        );
    }

    if (activeScreen === MFAScreens.SignUpConfirmation) {
        return (
            <WebauthnMFASignUpConfirmation
                onSignUp={onSignUp}
                onBackButtonClicked={
                    showBackButtonOnSignUpConfirmation ? onClickSignUpConfirmationBackButton : undefined
                }
                email={signUpEmail}
                error={props.featureState.error}
            />
        );
    }

    return (
        <WebauthnMFASignIn
            onBackButtonClicked={props.featureState.showBackButton ? onBackButtonClicked : undefined}
            canRegisterPasskey={props.featureState.canRegisterPasskey}
            onSignIn={onSignIn}
            error={props.featureState.error}
            deviceSupported={props.featureState.deviceSupported}
            onRegisterPasskeyClick={onRegisterPasskeyClick}
        />
    );
}
