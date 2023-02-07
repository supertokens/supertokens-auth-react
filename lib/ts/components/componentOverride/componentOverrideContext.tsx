import React from "react";

import type { ComponentOverride } from "./componentOverride";

export type GenericComponentOverrideMap<T> = {
    [K in keyof T]?: ComponentOverride<any>;
};

type ContextType<T> = GenericComponentOverrideMap<T> | "IS_DEFAULT";

export const ComponentOverrideContext = React.createContext<ContextType<any>>("IS_DEFAULT");
