import type { ComponentOverride } from "./componentOverride";
import type React from "react";
export declare const useComponentOverride: <TComponent extends React.ComponentType<any>>(
    overrideKey: string
) => ComponentOverride<TComponent> | null;
