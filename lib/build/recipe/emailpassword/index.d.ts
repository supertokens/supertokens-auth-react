import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig, SignOutResponse } from "./types";
import SignInAndUp from "./components/signInAndUp/SignInAndUp";
import SignInAndUpTheme from "./components/signInAndUp/themes/default";
import ResetPasswordUsingToken from "./components/resetPasswordUsingToken/resetPasswordUsingToken";
import ResetPasswordUsingTokenTheme from "./components/resetPasswordUsingToken/themes/default";
export default class EmailPasswordAPIWrapper {
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
    static signOut(): Promise<SignOutResponse>;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const SignOut: typeof EmailPasswordAPIWrapper.signOut;
export { EmailPasswordAPIWrapper, init, SignInAndUp, SignInAndUpTheme, SignOut, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme, };
