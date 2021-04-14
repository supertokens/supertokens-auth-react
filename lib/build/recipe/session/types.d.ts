import { RecipeModuleConfig } from "../recipeModule/types";
export declare type SessionUserInput = {
    sessionScope?: string;
    refreshAPICustomHeaders?: any;
    signoutAPICustomHeaders?: any;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
};
export declare type SessionConfig = RecipeModuleConfig<unknown, unknown, unknown> & SessionUserInput;
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    jwtPayload: any;
};
