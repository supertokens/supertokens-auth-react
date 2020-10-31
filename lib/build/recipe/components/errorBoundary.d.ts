import React from "react";
import { ErrorInfo } from "react";
export default class ErrorBoundary extends React.Component<{}, {
    hasError: boolean;
}> {
    constructor(props: {
        hasError: boolean;
    });
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): {} | null | undefined;
}
