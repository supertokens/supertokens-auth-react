import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig, SignOutResponse } from "./types";
import SignInAndUp from "./components/signInAndUp/SignInAndUp";
import SignInAndUpTheme from "./components/signInAndUp/themes/default";
import ResetPasswordUsingTokenTheme from "./components/resetPasswordUsingToken/themes/default";
import ResetPasswordUsingToken from "./components/resetPasswordUsingToken/resetPasswordUsingToken";
export default class EmailPasswordAPIWrapper {
    SignInAndUp: import("../../types").ReactComponentClass;
    SignInAndUpTheme: typeof SignInAndUpTheme;
    ResetPasswordUsingToken: typeof ResetPasswordUsingToken;
    ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
    static signOut(): Promise<SignOutResponse>;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const signOut: typeof EmailPasswordAPIWrapper.signOut;
export { EmailPasswordAPIWrapper, init, SignInAndUp, SignInAndUpTheme, signOut, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme };
