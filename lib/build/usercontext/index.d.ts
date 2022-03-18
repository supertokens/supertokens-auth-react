import React from "react";
import { UserContextType } from "./types";
export declare const UserContextContext: React.Context<UserContextType>;
export declare const useUserContext: () => UserContextType;
export declare const UserContextProvider: React.FC<{
    children: React.ReactNode;
    userContext?: any;
}>;
