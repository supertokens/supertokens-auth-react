/// <reference types="react" />
declare type FeatureWrapperProps = {
    children: JSX.Element;
    useShadowDom?: boolean;
};
export default function FeatureWrapper({ children, useShadowDom }: FeatureWrapperProps): JSX.Element;
export {};
