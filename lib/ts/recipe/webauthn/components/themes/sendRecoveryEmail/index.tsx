import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import { AuthPageFooter } from "../../../../../ui";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { SendRecoveryEmailScreen } from "../../../types";
import { ThemeBase } from "../themeBase";

import { PasskeyEmailSent } from "./emailSent";
import { PasskeyRecoverAccount } from "./recoverAccountForm";

import type { SendRecoveryEmailFormThemeProps } from "../../../types";

export const SendRecoveryEmailFormThemeInner = (
    props: SendRecoveryEmailFormThemeProps & {
        activeScreen: SendRecoveryEmailScreen;
        setActiveScreen: React.Dispatch<React.SetStateAction<SendRecoveryEmailScreen>>;
    }
): JSX.Element | null => {
    return props.activeScreen === SendRecoveryEmailScreen.RecoverAccount ? (
        <PasskeyRecoverAccount
            onSuccess={props.onRecoverAccountFormSuccess}
            onBackClick={props.onRecoverAccountBackClick}
            recipeImplementation={props.recipeImplementation}
        />
    ) : props.activeScreen === SendRecoveryEmailScreen.RecoverEmailSent ? (
        <PasskeyEmailSent email={props.recoverAccountEmail} onEmailChangeClick={props.onEmailChangeClick} />
    ) : null;
};

const SendRecoveryEmailFormTheme = (props: SendRecoveryEmailFormThemeProps): JSX.Element => {
    const stInstance = SuperTokens.getInstanceOrThrow();
    const rootStyle = stInstance.rootStyle;
    const privacyPolicyLink = stInstance.privacyPolicyLink;
    const termsOfServiceLink = stInstance.termsOfServiceLink;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle]}>
                <div data-supertokens="container authPage recoverAccountWithEmail">
                    <div data-supertokens="row">
                        {props.error !== undefined && <GeneralError error={props.error} />}
                        <SendRecoveryEmailFormThemeInner
                            {...props}
                            activeScreen={props.activeScreen}
                            setActiveScreen={props.setActiveScreen}
                        />
                        {props.activeScreen !== SendRecoveryEmailScreen.RecoverEmailSent && (
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
