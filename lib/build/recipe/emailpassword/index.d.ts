/// <reference types="react" />
import { SuccessAPIResponse } from "../../types";
import { UserInput } from "./types";
import EmailPasswordAuth from "./emailPasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
export default class Wrapper {
    static init(
        config?: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static redirectToAuth(show?: "signin" | "signup"): void;
    static EmailPasswordAuth: typeof EmailPasswordAuth;
    static SignInAndUp: JSX.Element;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static EmailVerification: JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInAndUp: JSX.Element;
declare const ResetPasswordUsingToken: JSX.Element;
declare const EmailVerification: JSX.Element;
export {
    EmailPasswordAuth,
    init,
    isEmailVerified,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
};
