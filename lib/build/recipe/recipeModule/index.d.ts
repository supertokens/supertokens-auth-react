import { BaseRecipeModule } from "./baseRecipeModule";
import type { NormalisedConfig } from "./types";
import type { Navigate, NormalisedGetRedirectionURLContext, UserContext } from "../../types";
export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> extends BaseRecipeModule<GetRedirectionURLContextType, Action, OnHandleEventContextType, N> {
    redirect: (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContextType>,
        navigate: Navigate | undefined,
        queryParams?: Record<string, string>,
        userContext?: UserContext
    ) => Promise<void>;
    getRedirectUrl: (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContextType>,
        userContext: UserContext
    ) => Promise<string | null>;
    getDefaultRedirectionURL(
        _: NormalisedGetRedirectionURLContext<GetRedirectionURLContextType>,
        _userContext: UserContext
    ): Promise<string>;
}
