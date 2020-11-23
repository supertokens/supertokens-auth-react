import { CSSObject } from "@emotion/core";
import React from "react";
import { Styles } from "../../../../types";
import { NormalisedPalette, NormalisedDefaultStyles } from "../themes/default/types";
declare type NormalisedStyle = {
    palette: NormalisedPalette;
    [x: string]: CSSObject;
};
export declare function StyleProvider({ children, styleFromInit, getDefaultStyles, defaultPalette }: {
    children: JSX.Element;
    styleFromInit?: Styles;
    getDefaultStyles: (palette: NormalisedPalette) => NormalisedDefaultStyles;
    defaultPalette: NormalisedPalette;
}): JSX.Element;
export declare const StyleConsumer: React.ExoticComponent<React.ConsumerProps<NormalisedStyle>>;
export {};
