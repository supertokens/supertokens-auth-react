import type { FC } from "react";
export declare type ProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    getRedirectURL?: () => string;
    buttonComponent?: BuiltInProviderConfig["buttonComponent"];
};
export declare type BuiltInProviderConfig = {
    buttonComponent?:
        | FC<{
              name: string;
          }>
        | {
              new (props: { name: string }): React.Component<any, any>;
          };
    clientId?: string;
    getRedirectURL?: () => string;
};
export declare type CustomProviderConfig = {
    id: string;
    name: string;
    clientId?: string;
    buttonComponent?:
        | FC<{
              name: string;
          }>
        | {
              new (props: { name: string }): React.Component<any, any>;
          };
    getRedirectURL?: () => string;
};
