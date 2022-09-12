/// <reference types="react" />
export declare type ProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type BuiltInProviderConfig = {
    buttonComponent?: JSX.Element;
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type CustomProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    buttonComponent?: JSX.Element;
    getRedirectURL?: () => string;
};
