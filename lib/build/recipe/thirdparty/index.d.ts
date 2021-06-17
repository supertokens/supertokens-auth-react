/// <reference types="react" />
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";
import ThirdPartyAuth from "./thirdpartyAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import Apple from "./providers/apple";
import Google from "./providers/google";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../authRecipeModule/types").GetRedirectionURLContext,
        PreAPIHookContext,
        import("../authRecipeModule/types").OnHandleEventContext,
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
    ): void;
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static ThirdPartyAuth: typeof ThirdPartyAuth;
    static SignInAndUp: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInAndUp: (prop?: any) => JSX.Element;
declare const EmailVerification: (prop?: any) => JSX.Element;
export {
    ThirdPartyAuth,
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
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
