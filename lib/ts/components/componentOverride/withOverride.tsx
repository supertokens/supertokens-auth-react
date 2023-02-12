import React from "react";

import { useComponentOverride } from "./useComponentOverride";

export const withOverride = <TComponent extends React.ComponentType<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
): React.ComponentType<React.ComponentProps<TComponent>> => {
    const finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return (props: React.ComponentProps<TComponent>) => {
        const OverrideComponent = useComponentOverride(finalKey);
        if (OverrideComponent !== null) {
            return <OverrideComponent DefaultComponent={DefaultComponent} {...props} />;
        }

        return <DefaultComponent {...props} />;
    };
};
