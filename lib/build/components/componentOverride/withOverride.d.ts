import React from "react";
export declare const withOverride: <TComponent extends React.ComponentType<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
) => React.ComponentType<React.ComponentProps<TComponent>>;
