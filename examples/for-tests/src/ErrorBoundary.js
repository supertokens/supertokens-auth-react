import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: undefined };
    }

    componentDidCatch(error) {
        this.setState({
            error,
        });
        console.info("ST_THROWN_ERROR");
    }

    render() {
        if (this.state.error) {
            throw this.state.error;
        }

        return this.props.children;
    }
}
