import React, { PropsWithChildren } from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { EmailPasswordAuth } from "../../lib/ts/recipe/emailpassword";
import { PasswordlessAuth } from "../../lib/ts/recipe/passwordless";
import { ThirdPartyAuth } from "../../lib/ts/recipe/thirdparty";
import { ThirdPartyEmailPasswordAuth } from "../../lib/ts/recipe/thirdpartyemailpassword";
import { ThirdPartyPasswordlessAuth } from "../../lib/ts/recipe/thirdpartypasswordless";

class ErrorBoundary extends React.Component<PropsWithChildren<any>, { error: any }> {
    constructor(props: any) {
        super(props);
        this.state = { error: undefined };
    }

    componentDidCatch(error: any) {
        this.setState({ error });
    }

    render() {
        return this.state.error ? <div>{this.state.error.toString()}</div> : this.props.children;
    }
}

describe("Auth wrappers in SSR", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    const authComponents = [
        EmailPasswordAuth,
        PasswordlessAuth,
        ThirdPartyAuth,
        ThirdPartyEmailPasswordAuth,
        ThirdPartyPasswordlessAuth,
    ];
    for (const Auth of authComponents) {
        test(`${Auth.name} should work without recipe init`, async () => {
            // We "simulate" SSR rendering by mocking useEffect to not be called
            jest.spyOn(React, "useEffect").mockImplementation((fn) => {});
            render(<Auth />);
        });
    }
    for (const Auth of authComponents) {
        test(`${Auth.name} should work without recipe init`, async () => {
            // We suppress errors from react to not spam the console with uncaught error exceptions
            jest.spyOn(console, "error").mockImplementation(() => {});
            expect(() => render(<Auth />)).toThrow(/No instance of Session found/);
        });
    }
});
