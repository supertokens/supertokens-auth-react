import { CSSObject } from "@emotion/react";
import React, { PropsWithChildren } from "react";
import { NormalisedDefaultStyles, NormalisedPalette, Styles } from "../types";
declare type NormalisedStyle = {
    palette: NormalisedPalette;
    [x: string]: CSSObject;
};
declare const StyleContext: React.Context<NormalisedStyle>;
export declare const StyleProvider: React.FC<
    PropsWithChildren<{
        styleFromInit?: Styles;
        rootStyleFromInit: Styles;
        getDefaultStyles: (palette: NormalisedPalette) => NormalisedDefaultStyles;
        defaultPalette: NormalisedPalette;
        rawPalette: Record<string, string>;
    }>
>;
export default StyleContext;
