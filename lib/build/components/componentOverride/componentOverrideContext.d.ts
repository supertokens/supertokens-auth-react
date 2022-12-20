import React from "react";
import { ComponentOverride } from "./componentOverride";
declare type ContextType<T> =
    | {
          [K in keyof T]?: ComponentOverride<any>;
      }
    | "IS_DEFAULT";
export declare const ComponentOverrideContext: React.Context<ContextType<any>>;
export declare const ComponentsOverrideContextProvider: <T extends Record<string, ComponentOverride<any>>>({
    children,
    components,
}: {
    children: React.ReactNode;
    components: T;
}) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
