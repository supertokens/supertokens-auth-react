import type React from "react";
export declare type ComponentOverrideProps<TComponent extends React.ComponentType<any>> =
    React.ComponentProps<TComponent> & {
        DefaultComponent: TComponent;
    };
export declare type ComponentOverride<TComponent extends React.ComponentType<any>> = React.ComponentType<
    ComponentOverrideProps<TComponent>
>;
