import { CreateRecipeFunction } from "../../types";
import { EmailPasswordUserInput, SignOutAPIResponse } from "./types";
import EmailPasswordAuth from "./components/emailPasswordAuth";
import SignInAndUp from "./components/features/signInAndUp/signInAndUp";
import SignInAndUpTheme from "./components/themes/default/signInAndUp";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/resetPasswordUsingToken";
import ResetPasswordUsingTokenTheme from "./components/themes/default/resetPasswordUsingToken";
import EmailVerification from "./components/features/emailVerification/emailVerification";
import EmailVerificationScreenTheme from "./components/themes/default/emailVerification/emailVerificationScreen";
export default class EmailPasswordAPIWrapper {
    static EmailPasswordAuth: import("../../types").ReactComponentClass;
    static SignInAndUp: typeof SignInAndUp;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: typeof ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static EmailVerification: typeof EmailVerification;
    static EmailVerificationScreenTheme: typeof EmailVerificationScreenTheme;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SignOutAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const signOut: typeof EmailPasswordAPIWrapper.signOut;
declare const isEmailVerified: typeof EmailPasswordAPIWrapper.isEmailVerified;
export { EmailPasswordAuth, EmailPasswordAPIWrapper, init, isEmailVerified, SignInAndUp, SignInAndUpTheme, signOut, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme, EmailVerification, EmailVerificationScreenTheme };
