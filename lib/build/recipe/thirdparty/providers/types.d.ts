import type { Component } from "react";
export declare type ProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type BuiltInProviderConfig = {
    buttonComponent?: CustomProviderConfig["buttonComponent"];
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type CustomProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    buttonComponent?: typeof Component;
    getRedirectURL?: () => string;
};
