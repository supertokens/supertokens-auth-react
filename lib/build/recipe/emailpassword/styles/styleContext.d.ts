import React from "react";
export declare function StyleProvider({ children }: {
    children: JSX.Element;
}): JSX.Element;
export declare const StyleConsumer: React.ExoticComponent<React.ConsumerProps<{
    palette: import("../types").NormalisedPalette;
    defaultStyles: import("../types").NormalisedDefaultStyles;
}>>;
