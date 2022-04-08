import { TranslationStore } from "../translation/translationHelpers";
import { PropsWithChildren } from "react";
declare type FeatureWrapperProps = {
    useShadowDom?: boolean;
    defaultStore: TranslationStore;
};
export default function FeatureWrapper({
    children,
    useShadowDom,
    defaultStore,
}: PropsWithChildren<FeatureWrapperProps>): JSX.Element;
export {};
