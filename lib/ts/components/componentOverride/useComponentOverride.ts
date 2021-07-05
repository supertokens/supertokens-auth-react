import React, { useContext } from "react";
import { ComponentOverrideContext } from "./componentOverrideContext";
import { ComponentOverride } from "./componentOverride";

export const useComponentOverride = <TComponent extends React.ComponentType<any>>(
    overrideKey: string
): ComponentOverride<TComponent> | null => {
    const ctx = useContext(ComponentOverrideContext);

    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }

    const OverrideComponent = ctx[overrideKey];

    return OverrideComponent === undefined ? null : OverrideComponent;
};
