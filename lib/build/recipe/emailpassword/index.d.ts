import { CreateRecipeFunction } from "../../types";
import { EmailPasswordUserInput, SignOutAPIResponse } from "./types";
import SignInAndUpTheme from "./components/themes/default/signInAndUp";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/resetPasswordUsingToken";
import { ResetPasswordUsingTokenTheme } from "./components/themes/default/resetPasswordUsingToken";
import SignInAndUp from "./components/features/signInAndUp/SignInAndUp";
export default class EmailPasswordAPIWrapper {
    static SignInAndUp: typeof SignInAndUp;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: typeof ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SignOutAPIResponse>;
}
declare const init: typeof EmailPasswordAPIWrapper.init;
declare const signOut: typeof EmailPasswordAPIWrapper.signOut;
export { EmailPasswordAPIWrapper, init, SignInAndUp, SignInAndUpTheme, signOut, ResetPasswordUsingToken, ResetPasswordUsingTokenTheme };
