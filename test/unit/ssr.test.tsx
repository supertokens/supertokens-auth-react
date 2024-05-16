import React, { PropsWithChildren } from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SessionAuth } from "../../lib/ts/recipe/session";
import { SuperTokensWrapper } from "../../lib/ts";

describe("Auth wrappers in SSR", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    const authComponents = [SessionAuth, SuperTokensWrapper];
    for (const Auth of authComponents) {
        test(`${Auth.name} should work without recipe init`, async () => {
            // We "simulate" SSR rendering by mocking useEffect to not be called
            jest.spyOn(React, "useEffect").mockImplementation((fn) => {});
            render(<Auth />);
        });
    }
    console.log("a");
    for (const Auth of authComponents) {
        test(`${Auth.name} should work without recipe init`, async () => {
            // We suppress errors from react to not spam the console with uncaught error exceptions
            jest.spyOn(console, "error").mockImplementation(() => {});
            expect(() => render(<Auth />)).toThrow(/No instance of Session found/);
        });
    }
});
