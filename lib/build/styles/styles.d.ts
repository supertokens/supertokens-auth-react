/** @jsx jsx */
import { CSSObject } from "@emotion/react";
import { NormalisedPalette, NormalisedDefaultStyles } from "../types";
export declare const defaultPalette: NormalisedPalette;
export declare const slideTop: import("@emotion/serialize").Keyframes;
export declare const swingIn: import("@emotion/serialize").Keyframes;
export declare function getDefaultStyles(palette: NormalisedPalette): NormalisedDefaultStyles;
export declare function getButtonStyle(color: string, brighten?: boolean): CSSObject;
export declare function getMergedStyles(defaultStyles: NormalisedDefaultStyles, themeStyles: NormalisedDefaultStyles): NormalisedDefaultStyles;
