/// <reference types="react" />
import { UserInput } from "./types";
import PasswordlessAuth from "./passwordlessAuth";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";
import SignInUpThemeWrapper from "./components/themes/signInUp";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../authRecipe/types").GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(): Promise<void>;
    static redirectToAuth(
        input?:
            | ("signin" | "signup")
            | {
                  show?: "signin" | "signup";
                  redirectBack?: boolean;
              }
    ): Promise<void>;
    static PasswordlessAuth: typeof PasswordlessAuth;
    static SignInUp: (prop?: any) => JSX.Element;
    static SignInUpTheme: typeof SignInUpThemeWrapper;
    static LinkClicked: (prop?: any) => JSX.Element;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInUp: (prop?: any) => JSX.Element;
declare const SignInUpTheme: typeof SignInUpThemeWrapper;
declare const LinkClicked: (prop?: any) => JSX.Element;
export {
    PasswordlessAuth,
    SignInUp,
    SignInUpTheme,
    LinkClicked,
    init,
    signOut,
    redirectToAuth,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
