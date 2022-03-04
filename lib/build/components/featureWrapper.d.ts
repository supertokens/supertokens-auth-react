/// <reference types="react" />
import { TranslationStore } from "../translation/translationHelpers";
declare type FeatureWrapperProps = {
    children: JSX.Element;
    useShadowDom?: boolean;
    defaultStore: TranslationStore;
};
export default function FeatureWrapper({ children, useShadowDom, defaultStore }: FeatureWrapperProps): JSX.Element;
export {};
