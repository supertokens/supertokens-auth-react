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

        if (ctx === "IS_DEFAULT") {
            throw new Error("Using withOverride HOC without a parent Provider");
        }

        const OverrideComponentFactory = ctx[overrideKey];

        if (OverrideComponentFactory === undefined) {
            return <DefaultComponent {...props} />;
        }

        const OverrideComponent = OverrideComponentFactory(DefaultComponent);

        return <OverrideComponent {...props} />;
    };
};
