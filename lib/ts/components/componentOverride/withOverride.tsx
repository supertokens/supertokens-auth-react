/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";
import { ComponentOverrideContext } from "./componentOverrideContext";

export const withOverride = <TComponent extends React.FunctionComponent<any> | React.ComponentClass<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
) => {
    return (props: React.ComponentProps<TComponent>) => {
        const ctx = useContext(ComponentOverrideContext);

        if (ctx === undefined || ctx === null) {
            throw new Error("Missing ComponentOverrideContext!");
        }

        const OverrideComponent = ctx[overrideKey];

        const EffectiveComponent =
            OverrideComponent === undefined ? DefaultComponent : OverrideComponent(DefaultComponent);

        return <EffectiveComponent {...props} />;
    };
};
