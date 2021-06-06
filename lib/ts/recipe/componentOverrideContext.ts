import React from "react";
import { ComponentOverride } from "./componentOverride";

type ContextType<T> = {
    [K in keyof T]?: ComponentOverride<any>;
};

export const ComponentOverrideContext = React.createContext<ContextType<any>>({});
