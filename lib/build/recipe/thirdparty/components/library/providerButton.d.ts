/// <reference types="react" />
export declare type ProviderButtonProps = {
    providerName: string;
    displayName: string;
    logo?: JSX.Element;
};
export default function ProviderButton({
    logo,
    providerName,
    displayName,
}: ProviderButtonProps): import("@emotion/react/jsx-runtime").JSX.Element;
