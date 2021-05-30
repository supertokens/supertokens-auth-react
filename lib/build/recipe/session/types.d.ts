import { Config as RecipeModuleConfig } from "../recipeModule/types";
import RecipeImplementation from "./recipeImplementation";
export declare type UserInput = {
    sessionScope?: string;
    refreshAPICustomHeaders?: any;
    signoutAPICustomHeaders?: any;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
};
export declare type Config = UserInput & RecipeModuleConfig<unknown, unknown, unknown>;
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    jwtPayload: any;
};
export interface RecipeInterface {
    getUserId(): Promise<string>;
    getJWTPayloadSecurely(): Promise<any>;
    doesSessionExist(): Promise<boolean>;
    signOut(): Promise<void>;
}
