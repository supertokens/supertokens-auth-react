/// <reference types="react" />
/** @jsx jsx */
import { jsx } from "@emotion/react";
export declare type ProviderButtonProps = {
    providerName: string;
    displayName: string;
    logo?: JSX.Element;
};
export default function ProviderButton({ logo, providerName, displayName }: ProviderButtonProps): jsx.JSX.Element;
