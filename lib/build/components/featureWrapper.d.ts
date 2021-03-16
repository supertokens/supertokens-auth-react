/// <reference types="react" />
declare type FeatureWrapperProps = {
    children: JSX.Element;
    useShadowDom?: boolean;
    isEmbedded?: boolean;
};
export default function FeatureWrapper({ isEmbedded, children, useShadowDom }: FeatureWrapperProps): JSX.Element;
export {};
