/// <reference types="react" />
import { NormalisedDefaultStyles } from "../emailpassword/types";
declare type FeatureWrapperProps = {
    defaultStyles: NormalisedDefaultStyles;
    children: JSX.Element;
};
export default function FeatureWrapper({ children, defaultStyles }: FeatureWrapperProps): JSX.Element;
export {};
