/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import { NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import EmailVerification from "../emailverification/recipe";
export default abstract class AuthRecipeWithEmailVerification<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext>
> extends AuthRecipe<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext, N> {
    emailVerification: EmailVerification;
    constructor(
        config: N,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    savePostEmailVerificationSuccessRedirectState: (context: T) => Promise<void>;
    getAuthRecipeWithEmailVerificationDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getAuthRecipeWithEmailVerificationFeatureComponent: (componentName: "emailverification", props: any) => JSX.Element;
    getAuthRecipeWithEmailVerificationFeatures: () => Record<
        string,
        import("../../types").ComponentWithRecipeAndMatchingMethod
    >;
}
