import { Config as RecipeModuleConfig } from "../recipeModule/types";
export declare type UserInput = {
    sessionScope?: string;
    refreshAPICustomHeaders?: any;
    signoutAPICustomHeaders?: any;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
};
export declare type Config = UserInput & RecipeModuleConfig<unknown, unknown, unknown>;
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    jwtPayload: any;
};
