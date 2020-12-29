import { CSSObject } from "@emotion/react";
export declare enum paletteColorOptions {
    BACKGROUND = "background",
    INPUTBACKGROUND = "inputBackground",
    GENERALERRORBACKGROUND = "generalErrorBackground",
    PRIMARY = "primary",
    ERROR = "error",
    TEXTTITLE = "textTitle",
    TEXTLABEL = "textLabel",
    TEXTPRIMARY = "textPrimary",
    TEXTLINK = "textLink"
}
export declare type NormalisedPalette = {
    colors: Record<string, string>;
    fonts: {
        size: string[];
    };
};
export declare type NormalisedDefaultStyles = Record<string, CSSObject>;
