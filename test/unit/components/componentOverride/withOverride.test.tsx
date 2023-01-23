import "@testing-library/jest-dom";
import React, { useState } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withOverride } from "../../../../lib/ts/components/componentOverride/withOverride";
import { ComponentOverrideContext } from "../../../../lib/ts/components/componentOverride/componentOverrideContext";
import { ComponentOverride } from "../../../../lib/ts/components/componentOverride/componentOverride";

const DefaultComponent = withOverride("DefaultComponent", ({ foo }: { foo: string }) => {
    return <span>Default component</span>;
});

const OverridenComponent: ComponentOverride<any> = ({ foo, DefaultComponent }) => {
    const [useOriginalComponent, setUseOriginalComponent] = useState(false);
    const [counter, setCounter] = useState(0);

    const SwitchButton = () => (
        <button onClick={() => setUseOriginalComponent((useOriginalComponent) => !useOriginalComponent)}>Switch</button>
    );

    return (
        <>
            {useOriginalComponent ? <DefaultComponent foo={foo} /> : <h1 data-testid="override">Override</h1>}
            <SwitchButton />
            <span>Counter: {counter}</span>
            <span>Foo: {foo}</span>
            <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
        </>
    );
};

describe("withOverride", () => {
    test("throw an error if no parent provider is set", async () => {
        const consoleErrorFn = jest.spyOn(console, "error").mockImplementation(() => {
            // We intentionally surpress console.error here: there is no way to avoid logging if the render fn throws
            // This is known and just produces noise in the console
            // https://stackoverflow.com/questions/66328549/testing-an-error-thrown-by-a-react-component-using-testing-library-and-jest
        });
        // when
        const doRender = () => render(<DefaultComponent foo="bar" />);

        // then
        expect(doRender).toThrowError();
        consoleErrorFn.mockRestore();
    });

    test("display overriden component if context key matches override key", async () => {
        // given
        const overrides = {
            DefaultComponent_Override: OverridenComponent,
        };

        // when
        const result = render(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="bar" />
            </ComponentOverrideContext.Provider>
        );

        // then
        expect(await result.findByTestId("override")).toHaveTextContent(/Override/i);
    });

    test("preserve override component state across rerenders", async () => {
        // given
        const overrides = {
            DefaultComponent_Override: OverridenComponent,
        };

        // when
        const result = render(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="bar" />
            </ComponentOverrideContext.Provider>
        );

        const Counter = () => result.findByText(/^Counter/);
        const SwitchButton = () => result.findByText(/^Switch/);
        const Increment = () => result.findByText(/^Increment/);
        const Foo = () => result.findByText(/^Foo/);

        const DefaultContent = () => result.findByText(/Default component/);

        expect(await Counter()).toHaveTextContent("Counter: 0");
        expect(await Foo()).toHaveTextContent("Foo: bar");

        await userEvent.click(await Increment());

        expect(await Counter()).toHaveTextContent("Counter: 1");

        await userEvent.click(await SwitchButton());

        expect(await DefaultContent()).toBeInTheDocument();

        result.rerender(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="baz" />
            </ComponentOverrideContext.Provider>
        );

        expect(await Foo()).toHaveTextContent("Foo: baz");
        expect(await Counter()).toHaveTextContent("Counter: 1");
    });
});
