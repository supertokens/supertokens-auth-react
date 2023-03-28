import type { FC } from "react";
export declare type ProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    getFrontendRedirectURI?: () => string;
};
export declare type BuiltInProviderConfig = {
    buttonComponent?: CustomProviderConfig["buttonComponent"];
    clientId?: string;
    getFrontendRedirectURI?: () => string;
};
export declare type CustomProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    buttonComponent?:
        | JSX.Element
        | FC<{
              name: string;
          }>;
    getRedirectURL?: () => string;
};
