/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import {
    UserInput,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    TPPWlessRecipeInterface,
} from "./types";
import ThirdPartyPasswordlessAuth from "./thirdpartyPasswordlessAuth";
import SignInUpTheme from "./components/themes/signInUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../authRecipeWithEmailVerification/types").GetRedirectionURLContext,
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
    static ThirdPartyPasswordlessAuth: import("react").FC<
        import("react").PropsWithChildren<{
            requireAuth?: boolean | undefined;
            onSessionExpired?: (() => void) | undefined;
            requiredClaims?: import("../session/types").SessionClaimValidator<any>[] | undefined;
        }>
    >;
    static SignInAndUp: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: typeof SignInUpTheme;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static PasswordlessLinkClickedTheme: import("react").ComponentType<
        import("../passwordless/types").LinkClickedScreenProps
    >;
    static PasswordlessLinkClicked: (prop?: any) => JSX.Element;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInAndUp: (prop?: any) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const EmailVerification: (prop?: any) => JSX.Element;
declare const PasswordlessLinkClicked: (prop?: any) => JSX.Element;
export {
    ThirdPartyPasswordlessAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    SignInAndUp,
    SignInUpTheme,
    ThirdPartySignInAndUpCallback,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    PasswordlessLinkClicked,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    TPPWlessRecipeInterface as RecipeInterface,
};
