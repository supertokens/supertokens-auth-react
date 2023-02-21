import React from "react";
import type { ComponentOverride } from "./componentOverride";
export declare type GenericComponentOverrideMap<T> = {
    [K in keyof T]?: ComponentOverride<any>;
};
declare type ContextType<T> = GenericComponentOverrideMap<T> | "IS_DEFAULT";
export declare const ComponentOverrideContext: React.Context<ContextType<any>>;
export {};
