import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import { EmailPasswordUserInput } from "./types";
import EmailPasswordAuth from "./components/emailPasswordAuth";
import { SignInAndUpFeature as SignInAndUp } from "./components/features/signInAndUp";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { ResetPasswordUsingTokenFeature as ResetPasswordUsingToken } from "./components/features/resetPasswordUsingToken";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification";
import { EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext } from "./types";
export default class EmailPasswordAPIWrapper {
    static EmailPasswordAuth: typeof EmailPasswordAuth;
    static SignInAndUp: typeof SignInAndUp;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: typeof ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static EmailVerification: typeof EmailVerification;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const signOut: typeof EmailPasswordAPIWrapper.signOut;
declare const isEmailVerified: typeof EmailPasswordAPIWrapper.isEmailVerified;
export { EmailPasswordAuth, EmailPasswordAPIWrapper, init, isEmailVerified, SignInAndUp, SignInAndUpTheme, signOut, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme, EmailVerification, EmailVerificationTheme, EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext };
