import { RecipeModuleConfig } from "../recipeModule/types";
export declare type SessionUserInput = {
    sessionScope?: string;
    refreshAPICustomHeaders?: any;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
};
export declare type SessionConfig = RecipeModuleConfig<unknown, unknown, unknown> & SessionUserInput;
export declare type SessionAuthState = {
    status: "LOADING" | "READY";
};
