import { UserInput } from "./types";
import EmailVerificationTheme from "./components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
export default class Wrapper {
    static EmailVerification: typeof EmailVerification;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static isEmailVerified(): Promise<boolean>;
}
declare const init: typeof Wrapper.init;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
export {
    init,
    isEmailVerified,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
};
