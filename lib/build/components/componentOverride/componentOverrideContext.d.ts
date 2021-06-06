import React from "react";
import { ComponentOverride } from "./componentOverride";
declare type ContextType<T> = {
    [K in keyof T]?: ComponentOverride<any>;
};
export declare const ComponentOverrideContext: React.Context<ContextType<any>>;
export {};
