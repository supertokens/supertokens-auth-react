import { CSSObject } from "@emotion/core";
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
    colors: Record<paletteColorOptions, string>;
    fonts: {
        size: string[];
    };
};
export declare enum defaultStylesOptions {
    CONTAINER = "container",
    ROW = "row",
    GENERALERROR = "generalError",
    INPUTWRAPPER = "inputWrapper",
    INPUT = "input",
    INPUTERROR = "inputError",
    INPUTADORNMENT = "inputAdornment",
    INPUTERRORMESSAGE = "inputErrorMessage",
    BUTTON = "button",
    LABEL = "label",
    FORMROW = "formRow",
    PRIMARYTEXT = "primaryText",
    SECONDARYTEXT = "secondaryText",
    LINK = "link",
    DIVIDER = "divider"
}
export declare type NormalisedDefaultStyles = Record<defaultStylesOptions, CSSObject>;
