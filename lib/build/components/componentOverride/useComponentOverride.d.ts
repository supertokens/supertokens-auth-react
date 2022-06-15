import React from "react";
import { ComponentOverride } from "./componentOverride";
export declare const useComponentOverride: <TComponent extends React.ComponentType<any>>(
    overrideKey: string
) => ComponentOverride<TComponent> | null;
