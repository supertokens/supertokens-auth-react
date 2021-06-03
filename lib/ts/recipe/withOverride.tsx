/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";
import { ComponentOverrideContext } from "./componentOverrideContext";

export const withOverride = <TComponent extends React.FunctionComponent<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
) => {
    return (props: React.ComponentProps<TComponent>) => {
        const OverrideComponent: TComponent = useContext(ComponentOverrideContext).get(overrideKey) as TComponent;

        const EffectiveComponent = OverrideComponent || DefaultComponent;

        return <EffectiveComponent {...props} />;
    };
};
