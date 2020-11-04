import { RecipeModuleConfig } from "../../types";
export declare type SessionUserInput = {
    sessionScope?: string;
    refreshAPICustomHeaders?: any;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
};
export declare type SessionConfig = RecipeModuleConfig & SessionUserInput;
