/// <reference types="react" />
/** @jsx jsx */
import { jsx } from "@emotion/react";
export declare type ProviderButtonProps = {
    children: React.ReactNode;
    providerName: string;
    logo?: JSX.Element;
};
export default function ProviderButton({ children, logo, providerName }: ProviderButtonProps): jsx.JSX.Element;
