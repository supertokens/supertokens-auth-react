import { CSSObject } from "@emotion/react";
import React from "react";
import { NormalisedDefaultStyles, NormalisedPalette, Styles } from "../types";
declare type NormalisedStyle = {
    palette: NormalisedPalette;
    [x: string]: CSSObject;
};
declare const StyleContext: React.Context<NormalisedStyle>;
export declare function StyleProvider({ children, styleFromInit, getDefaultStyles, defaultPalette, rawPalette, }: {
    children: JSX.Element;
    styleFromInit?: Styles;
    getDefaultStyles: (palette: NormalisedPalette) => NormalisedDefaultStyles;
    defaultPalette: NormalisedPalette;
    rawPalette: Record<string, string>;
}): JSX.Element;
export default StyleContext;
