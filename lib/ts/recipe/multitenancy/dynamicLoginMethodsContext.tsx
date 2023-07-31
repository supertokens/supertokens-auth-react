import React from "react";

import type { GetLoginMethodsResponseNormalized } from "./types";
import type { FC, PropsWithChildren } from "react";

export type DynamicLoginMethodsContextValue =
    | {
          loaded: false;
      }
    | {
          loaded: true;
          loginMethods: GetLoginMethodsResponseNormalized;
      };

const dynamicLoginMethodsContext = React.createContext<DynamicLoginMethodsContextValue | undefined>(undefined);

export const useDynamicLoginMethods = () => {
    const value = React.useContext(dynamicLoginMethodsContext);
    if (value === undefined) {
        throw new Error("useDynamicLoginMethods used outside of a valid provider (FeatureWrapper)");
    }
    return value;
};

export const DynamicLoginMethodsProvider: FC<
    PropsWithChildren<{ value: GetLoginMethodsResponseNormalized | undefined }>
> = ({ value, children }) => {
    const contextValue: DynamicLoginMethodsContextValue =
        value === undefined ? { loaded: false } : { loaded: true, loginMethods: value };
    return <dynamicLoginMethodsContext.Provider value={contextValue}>{children}</dynamicLoginMethodsContext.Provider>;
};
