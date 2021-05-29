/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { SuccessAPIResponse } from "../../types";
import EmailVerification from "../emailverification/recipe";
export default abstract class AuthRecipeModule<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext, N> {
    emailVerification: EmailVerification;
    constructor(
        config: N,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    getAuthRecipeModuleDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getAuthRecipeModuleFeatureComponent: (componentName: "emailverification", props: any) => JSX.Element;
    getAuthRecipeModuleFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    signOut: () => Promise<SuccessAPIResponse>;
    doesSessionExist: () => Promise<boolean>;
    redirectToAuthWithRedirectToPath: (
        show?: "signin" | "signup" | undefined,
        history?: any,
        queryParams?: any
    ) => void;
    redirectToAuthWithoutRedirectToPath: (
        show?: "signin" | "signup" | undefined,
        history?: any,
        queryParams?: any
    ) => void;
}
