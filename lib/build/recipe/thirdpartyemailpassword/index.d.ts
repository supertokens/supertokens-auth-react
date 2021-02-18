import { CreateRecipeFunction, SuccessAPIResponse } from "../../types";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { EmailVerification } from "./components/features/emailVerification";
import { ThirdPartyEmailPasswordUserInput, ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext } from "./types";
import ThirdPartyEmailPasswordAuth from "./thirdpartyEmailpasswordAuth";
import SignInAndUp from "./components/features/signInAndUp";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
export default class ThirdPartyEmailPasswordAPIWrapper {
    static init(config: ThirdPartyEmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SuccessAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static ThirdPartyEmailPasswordAuth: typeof ThirdPartyEmailPasswordAuth;
    static SignInAndUp: typeof SignInAndUp;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static EmailVerification: typeof EmailVerification;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const init: typeof ThirdPartyEmailPasswordAPIWrapper.init;
declare const signOut: typeof ThirdPartyEmailPasswordAPIWrapper.signOut;
declare const isEmailVerified: typeof ThirdPartyEmailPasswordAPIWrapper.isEmailVerified;
export { ThirdPartyEmailPasswordAuth, ThirdPartyEmailPasswordAPIWrapper, init, Apple, Google, Facebook, Github, isEmailVerified, SignInAndUp, SignInAndUpTheme, signOut, EmailVerification, EmailVerificationTheme, ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext };
