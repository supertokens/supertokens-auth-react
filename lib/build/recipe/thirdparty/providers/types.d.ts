import type { FC } from "react";
export declare type ProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type BuiltInProviderConfig = {
    buttonComponent?: FC<{
        name: string;
    }>;
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type CustomProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    buttonComponent?: FC<{
        name: string;
    }>;
    getRedirectURL?: () => string;
};
