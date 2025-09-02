/// <reference types="react" />
import { WebauthnMFAFooter } from "./mfaFooter";
import { WebauthnMFALoadingScreen } from "./mfaLoadingScreen";
import { WebauthnMFASignIn } from "./mfaSignIn";
import { WebauthnMFASignUp } from "./mfaSignUp";
import { WebauthnMFASignUpConfirmation } from "./mfaSignUpConfirmation";
import type { WebAuthnMFAProps } from "../../../types";
export {
    WebauthnMFALoadingScreen,
    WebauthnMFASignIn,
    WebauthnMFASignUp,
    WebauthnMFASignUpConfirmation,
    WebauthnMFAFooter,
};
export declare enum MFAScreens {
    SignIn = 0,
    SignUp = 1,
    SignUpConfirmation = 2,
}
declare function MFAThemeWrapper(props: WebAuthnMFAProps): JSX.Element;
export default MFAThemeWrapper;
export declare function MFATheme(props: WebAuthnMFAProps): JSX.Element;
