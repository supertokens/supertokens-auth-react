import { BaseRecipeModule } from "./baseRecipeModule";
import type { NormalisedConfig } from "./types";
import type { Navigate, UserContext } from "../../types";
export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> extends BaseRecipeModule<GetRedirectionURLContextType, Action, OnHandleEventContextType, N> {
    redirect: (
        context: GetRedirectionURLContextType,
        navigate?: Navigate,
        queryParams?: Record<string, string>,
        userContext?: UserContext
    ) => Promise<void>;
    getRedirectUrl: (context: GetRedirectionURLContextType, userContext: UserContext) => Promise<string | null>;
    getDefaultRedirectionURL(_: GetRedirectionURLContextType, _userContext: UserContext): Promise<string>;
}
