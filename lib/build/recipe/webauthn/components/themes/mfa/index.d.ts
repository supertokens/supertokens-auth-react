/// <reference types="react" />
import { WebauthnMFALoadingScreen } from "./loadingScreen";
import { WebauthnMFASignIn } from "./signIn";
import { WebauthnMFASignUp } from "./signUp";
import { WebauthnMFASignUpConfirmation } from "./signUpConfirmation";
import type { WebAuthnMFAProps } from "../../../types";
export { WebauthnMFALoadingScreen, WebauthnMFASignIn, WebauthnMFASignUp, WebauthnMFASignUpConfirmation };
export declare enum MFAScreens {
    SignIn = 0,
    SignUp = 1,
    SignUpConfirmation = 2
}
declare function MFAThemeWrapper(props: WebAuthnMFAProps): JSX.Element;
export default MFAThemeWrapper;
export declare function MFATheme(props: WebAuthnMFAProps): JSX.Element;
