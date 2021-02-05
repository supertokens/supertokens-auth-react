import RecipeModule from "../recipeModule";
import { NormalisedAuthRecipeConfig, AuthRecipeModuleConfig, AuthRecipeModuleGetRedirectionURLContext } from "./types";
import { SuccessAPIResponse } from "../../types";
import EmailVerification from "../emailverification";
export default abstract class AuthRecipeModule extends RecipeModule {
    config: NormalisedAuthRecipeConfig;
    emailVerification?: EmailVerification;
    constructor(config: AuthRecipeModuleConfig<unknown, unknown, unknown>);
    getAuthRecipeModuleDefaultRedirectionURL: (context: AuthRecipeModuleGetRedirectionURLContext) => Promise<string>;
    signOut: () => Promise<SuccessAPIResponse>;
    isEmailVerified(): Promise<boolean>;
    isEmailVerificationRequired(): boolean;
    doesSessionExist: () => boolean;
}
