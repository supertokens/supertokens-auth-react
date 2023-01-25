import React from "react";
import type { ComponentOverride } from "./componentOverride";
declare type ContextType<T> =
    | {
          [K in keyof T]?: ComponentOverride<any>;
      }
    | "IS_DEFAULT";
export declare const ComponentOverrideContext: React.Context<ContextType<any>>;
export {};
