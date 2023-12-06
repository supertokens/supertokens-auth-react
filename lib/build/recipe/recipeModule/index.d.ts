import { BaseRecipeModule } from "./baseRecipeModule";
import type { NormalisedConfig } from "./types";
import type { CustomHistory } from "../../types";
export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> extends BaseRecipeModule<GetRedirectionURLContextType, Action, OnHandleEventContextType, N> {
    redirect: (
        context: GetRedirectionURLContextType,
        history?: CustomHistory,
        queryParams?: Record<string, string>,
        userContext?: any
    ) => Promise<void>;
    getRedirectUrl: (context: GetRedirectionURLContextType, userContext?: any) => Promise<string | null>;
    getDefaultRedirectionURL(_: GetRedirectionURLContextType): Promise<string>;
}
