import React from "react";
import { ComponentOverride } from "./componentOverride";

type ContextType<T> =
    | {
          [K in keyof T]?: ComponentOverride<any>;
      }
    | "IS_DEFAULT";

export const ComponentOverrideContext = React.createContext<ContextType<any>>("IS_DEFAULT");

export const ComponentsOverrideContextProvider = <T extends Record<string, ComponentOverride<any>>>({
    children,
    components,
}: {
    children: React.ReactNode;
    components: T;
}) => {
    return <ComponentOverrideContext.Provider value={{ ...components }}>{children}</ComponentOverrideContext.Provider>;
};
