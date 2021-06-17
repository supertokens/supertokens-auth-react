/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
export declare const withOverride: <TComponent extends React.ComponentType<any>>(
    overrideKey: string,
    DefaultComponent: TComponent
) => (props: React.ComponentProps<TComponent>) => jsx.JSX.Element;
