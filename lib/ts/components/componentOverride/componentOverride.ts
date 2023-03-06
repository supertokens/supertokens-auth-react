import type React from "react";

export type ComponentOverrideProps<TComponent extends React.ComponentType<any>> = React.ComponentProps<TComponent> & {
    DefaultComponent: TComponent;
};

export type ComponentOverride<TComponent extends React.ComponentType<any>> = React.ComponentType<
    ComponentOverrideProps<TComponent>
>;
