import React from "react";
import { ErrorInfo, ReactNode } from "react";
declare type ErrorBoundaryState = {
    hasError: boolean;
};
export default class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
    constructor(props: {
        hasError: boolean;
    });
    static getDerivedStateFromError(): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): JSX.Element | ReactNode | undefined;
}
export {};
