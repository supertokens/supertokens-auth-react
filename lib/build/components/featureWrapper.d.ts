/// <reference types="react" />
import { TranslationStore } from "../translation/translationHelpers";
declare type FeatureWrapperProps = {
    children: JSX.Element;
    useShadowDom?: boolean;
    defaultStore: TranslationStore;
    userContext?: any;
};
export default function FeatureWrapper({
    children,
    useShadowDom,
    defaultStore,
    userContext,
}: FeatureWrapperProps): JSX.Element;
export {};
