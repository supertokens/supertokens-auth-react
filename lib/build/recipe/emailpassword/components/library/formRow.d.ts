/// <reference types="react" />
/** @jsx jsx */
import { jsx } from "@emotion/react";
declare type FormRowProps = {
    children: React.ReactNode;
    hasError?: boolean;
};
export default function FormRow({ children, hasError }: FormRowProps): jsx.JSX.Element;
export {};
