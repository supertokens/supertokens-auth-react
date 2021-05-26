/// <reference types="react" />
import { SuccessAPIResponse } from "../../types";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import ThirdPartyEmailPasswordAuth from "./thirdpartyEmailpasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        PreAPIHookContext,
        import("../emailpassword").OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static redirectToAuth(show?: "signin" | "signup"): void;
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static ThirdPartyEmailPasswordAuth: typeof ThirdPartyEmailPasswordAuth;
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
declare const EmailVerification: JSX.Element;
declare const ResetPasswordUsingToken: JSX.Element;
export {
    ThirdPartyEmailPasswordAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
};
