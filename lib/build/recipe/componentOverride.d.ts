import React from "react";
export interface ComponentOverride<TComponent extends React.FunctionComponent<any>> {
    (Component: TComponent): React.FunctionComponent<React.ComponentProps<TComponent>>;
}
