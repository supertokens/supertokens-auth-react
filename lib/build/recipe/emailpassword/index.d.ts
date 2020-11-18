import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig, SignOutResponse } from "./types";
import SignInAndUpTheme from "./components/themes/default/signInAndUp";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/resetPasswordUsingToken";
import { ResetPasswordUsingTokenTheme } from "./components/themes/default/resetPasswordUsingToken";
import SignInAndUp from "./components/features/signInAndUp/SignInAndUp";
export default class EmailPasswordAPIWrapper {
    static SignInAndUp: import("../../types").ReactComponentClass;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: typeof ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
    static signOut(): Promise<SignOutResponse>;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const signOut: typeof EmailPasswordAPIWrapper.signOut;
export { EmailPasswordAPIWrapper, init, SignInAndUp, SignInAndUpTheme, signOut, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme };
