/// <reference types="react" />
import { TranslationStore } from "../translationHelpers";
declare type FeatureWrapperProps = {
    children: JSX.Element;
    useShadowDom?: boolean;
    isEmbedded?: boolean;
    defaultStore: TranslationStore;
};
export default function FeatureWrapper({
    isEmbedded,
    children,
    useShadowDom,
    defaultStore,
}: FeatureWrapperProps): JSX.Element;
export {};
