import React from "react";

export class ErrorBoundary extends React.Component<unknown, { hasError: boolean; error: any }> {
    constructor(props: unknown) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>User error boundary hit with error:</h1>
                    <pre>{this.state.error.message ?? JSON.stringify(this.state.error, null, 2)}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}
