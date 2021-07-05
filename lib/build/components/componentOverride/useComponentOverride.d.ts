import React from "react";
export declare const useComponentOverride: <TComponent extends React.ComponentType<any>>(
    overrideKey: string
) =>
    | React.ComponentClass<import("./componentOverride").ComponentOverrideProps<TComponent>, any>
    | React.FunctionComponent<import("./componentOverride").ComponentOverrideProps<TComponent>>
    | null;
