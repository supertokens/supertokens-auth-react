/// <reference types="react" />
import { NormalisedDefaultStyles } from "../emailpassword/types";
declare type FeatureWrapperProps = {
    defaultStyles: NormalisedDefaultStyles;
    children: JSX.Element;
    useShadowDom?: boolean;
};
export default function FeatureWrapper({ children, defaultStyles, useShadowDom }: FeatureWrapperProps): JSX.Element;
export {};
