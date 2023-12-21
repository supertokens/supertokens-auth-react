import React from "react";
import type { UserContext } from "../types";
export declare const UserContextContext: React.Context<any>;
export declare const useUserContext: () => UserContext;
export declare const UserContextProvider: React.FC<{
    children: React.ReactNode;
    userContext?: UserContext;
}>;
