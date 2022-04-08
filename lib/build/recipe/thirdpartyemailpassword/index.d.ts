/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";
import ThirdPartyEmailPasswordAuth from "./thirdpartyEmailpasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../emailpassword").GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(): Promise<void>;
    static isEmailVerified(): Promise<boolean>;
    static redirectToAuth(
        input?:
            | ("signin" | "signup")
            | {
                  show?: "signin" | "signup";
                  redirectBack?: boolean;
              }
    ): Promise<void>;
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static ThirdPartyEmailPasswordAuth: import("react").FC<
        import("react").PropsWithChildren<{
            requireAuth?: boolean | undefined;
            onSessionExpired?: (() => void) | undefined;
        }>
    >;
    static SignInAndUp: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static ResetPasswordUsingToken: (prop?: any) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInAndUp: (prop?: any) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const EmailVerification: (prop?: any) => JSX.Element;
declare const ResetPasswordUsingToken: (prop?: any) => JSX.Element;
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
    ThirdPartySignInAndUpCallback,
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
    RecipeInterface,
};
