import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { EmailPasswordUserInput } from "./types";
import EmailPasswordAuth from "./components/emailPasswordAuth";
import SignInAndUp from "./components/features/signInAndUp/wrapper";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/wrapper";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification/wrapper";
import { EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext } from "./types";
export default class EmailPasswordAPIWrapper {
    static EmailPasswordAuth: typeof EmailPasswordAuth;
    static SignInAndUp: typeof SignInAndUp;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: typeof ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static EmailVerification: typeof EmailVerification;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction<EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext>;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static redirectToAuth(show?: "signin" | "signup"): void;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const signOut: typeof EmailPasswordAPIWrapper.signOut;
declare const isEmailVerified: typeof EmailPasswordAPIWrapper.isEmailVerified;
declare const redirectToAuth: typeof EmailPasswordAPIWrapper.redirectToAuth;
export { EmailPasswordAuth, EmailPasswordAPIWrapper, init, isEmailVerified, SignInAndUp, SignInAndUpTheme, signOut, redirectToAuth, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme, EmailVerification, EmailVerificationTheme, EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext, };
