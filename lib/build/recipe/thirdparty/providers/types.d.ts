import type { FC } from "react";
export declare type ProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    getFrontendRedirectURI?: () => string;
    buttonComponent?:
        | FC<{
              name: string;
          }>
        | {
              new (props: { name: string }): React.Component<any, any>;
          };
};
export declare type BuiltInProviderConfig = {
    buttonComponent?: ProviderConfig["buttonComponent"];
    clientId?: string;
    getFrontendRedirectURI?: () => string;
};
export declare type CustomProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    buttonComponent?: ProviderConfig["buttonComponent"];
    getRedirectURL?: () => string;
};
