/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";
import { ComponentOverrideContext } from "./componentOverrideContext";

export const withOverride = <TComponent extends React.FunctionComponent<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
) => {
    return (props: React.ComponentProps<TComponent>) => {
        const ctx = useContext(ComponentOverrideContext);

        if (!ctx) {
            throw new Error(
                "Missing ComponentOverrideContext! Be sure to use the overridable component inside a feature."
            );
        }

        const OverrideComponent = ctx[overrideKey];

        const EffectiveComponent =
            OverrideComponent === undefined ? DefaultComponent : OverrideComponent(DefaultComponent);

        return <EffectiveComponent {...props} />;
    };
};
