/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { useComponentOverride } from "./useComponentOverride";

export const withOverride = <TComponent extends React.ComponentType<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
): React.ComponentType<React.ComponentProps<TComponent>> => {
    return (props: React.ComponentProps<TComponent>) => {
        const OverrideComponent = useComponentOverride(overrideKey);

        if (OverrideComponent !== null) {
            return <OverrideComponent DefaultComponent={DefaultComponent} {...props} />;
        }

        return <DefaultComponent {...props} />;
    };
};
