import RecipeModule from "../recipeModule";
import { NormalisedAuthRecipeConfig, AuthRecipeModuleConfig, AuthRecipeModuleGetRedirectionURLContext } from "./types";
import { SuccessAPIResponse } from "../../types";
import EmailVerification from "../emailverification";
export default abstract class AuthRecipeModule<T, S, R> extends RecipeModule<T, S, R> {
    config: NormalisedAuthRecipeConfig;
    emailVerification?: EmailVerification<T, S, R>;
    constructor(config: AuthRecipeModuleConfig<unknown, unknown, unknown>);
    getAuthRecipeModuleDefaultRedirectionURL: (context: AuthRecipeModuleGetRedirectionURLContext) => Promise<string>;
    getAuthRecipeModuleFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getConfig: <T_1>() => T_1;
    signOut: () => Promise<SuccessAPIResponse>;
    isEmailVerified(): Promise<boolean>;
    isEmailVerificationRequired(): boolean;
    doesSessionExist: () => boolean;
}
//# sourceMappingURL=index.d.ts.map