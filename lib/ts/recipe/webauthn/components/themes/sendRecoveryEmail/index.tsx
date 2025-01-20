import { useState } from "react";

import { redirectToAuth } from "../../../../..";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { AuthPageFooter } from "../../../../../ui";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";

import { PasskeyEmailSent } from "./emailSent";
import { PasskeyRecoverAccountForm } from "./recoverAccountForm";

import type { SendRecoveryEmailFormThemeProps } from "../../../types";

export enum SendRecoveryEmailScreen {
    RecoverAccount,
    RecoverEmailSent,
}

export const SendRecoveryEmailFormThemeInner = (
    props: SendRecoveryEmailFormThemeProps & {
        activeScreen: SendRecoveryEmailScreen;
        setActiveScreen: React.Dispatch<React.SetStateAction<SendRecoveryEmailScreen>>;
    }
): JSX.Element | null => {
    const [recoverAccountEmail, setRecoverAccountEmail] = useState<string>("");
    const onRecoverAccountFormSuccess = (result: { email: string }) => {
        setRecoverAccountEmail(result.email);
        props.setActiveScreen(SendRecoveryEmailScreen.RecoverEmailSent);
    };

    const onRecoverAccountBackClick = async () => {
        await redirectToAuth({ show: "signup" });
    };

    const onEmailChangeClick = () => {
        props.setActiveScreen(SendRecoveryEmailScreen.RecoverAccount);
    };

    return props.activeScreen === SendRecoveryEmailScreen.RecoverAccount ? (
        <PasskeyRecoverAccountForm
            onSuccess={onRecoverAccountFormSuccess}
            onBackClick={onRecoverAccountBackClick}
            recipeImplementation={props.recipeImplementation}
            setError={(error) => console.error(error)}
        />
    ) : props.activeScreen === SendRecoveryEmailScreen.RecoverEmailSent ? (
        <PasskeyEmailSent email={recoverAccountEmail} onEmailChangeClick={onEmailChangeClick} />
    ) : null;
};

const SendRecoveryEmailFormTheme = (props: SendRecoveryEmailFormThemeProps): JSX.Element => {
    const stInstance = SuperTokens.getInstanceOrThrow();
    const rootStyle = stInstance.rootStyle;
    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    const [activeScreen, setActiveScreen] = useState<SendRecoveryEmailScreen>(SendRecoveryEmailScreen.RecoverAccount);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle]}>
                <div data-supertokens="container authPage recoverAccountWithEmail">
                    <div data-supertokens="row">
                        {props.error !== undefined && <GeneralError error={props.error} />}
                        <SendRecoveryEmailFormThemeInner
                            {...props}
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                        />
                        {activeScreen !== SendRecoveryEmailScreen.RecoverEmailSent && (
                            <AuthPageFooter
                                factorIds={[]}
                                isSignUp={true}
                                hasSeparateSignUpView={true}
                                privacyPolicyLink={privacyPolicyLink}
                                termsOfServiceLink={termsOfServiceLink}
                            />
                        )}
                    </div>
                    <SuperTokensBranding />
                </div>
            </ThemeBase>
        </UserContextWrapper>
    );
};

export default SendRecoveryEmailFormTheme;
