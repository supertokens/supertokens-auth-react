import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig } from "./types";
import SignInAndUp from "./components/signInAndUp/SignInAndUp";
import SignInAndUpTheme from "./components/signInAndUp/themes/default";
import ResetPasswordUsingToken from "./components/resetPasswordUsingToken/resetPasswordUsingToken";
import ResetPasswordUsingTokenTheme from "./components/resetPasswordUsingToken/themes/default";
export default class EmailPasswordAPIWrapper {
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
}
export declare const init: typeof EmailPasswordAPIWrapper.init;
export { SignInAndUp, SignInAndUpTheme, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme, EmailPasswordAPIWrapper };
