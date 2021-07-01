import React, { useState } from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withOverride } from "../../../../lib/ts/components/componentOverride/withOverride";
import { ComponentOverrideContext } from "../../../../lib/ts/components/componentOverride/componentOverrideContext";

const OverridenComponent = ({ foo }: { foo: string }) => {
    const [counter, setCounter] = useState(0);

    return (
        <>
            <span>Counter: {counter}</span>
            <span>Foo: {foo}</span>
            <button onClick={() => setCounter((c) => c + 1)}>Update</button>
        </>
    );
};

describe("withOverride", () => {
    const DefaultComponent = withOverride("DefaultComponent", ({ foo }: { foo: string }) => (
        <h1 data-testid="heading">Default</h1>
    ));

    test("throw an error if no parent provider is set", async () => {
        // when
        const doRender = () => render(<DefaultComponent foo="bar" />);

        // then
        expect(doRender).toThrowError();
    });

    test("display overriden component if context key matches override key", async () => {
        // given
        const overrides = {
            DefaultComponent: () => OverridenComponent,
        };

        // when
        const result = render(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="bar" />
            </ComponentOverrideContext.Provider>
        );

        // then
        expect(await result.findByText(/^Counter:/i)).toHaveTextContent(/Counter: 0/i);
        expect(await result.findByText(/^Foo:/i)).toHaveTextContent(/Foo: bar/i);
    });

    test("preserve component state across rerenders", async () => {
        // given
        const overrides = {
            DefaultComponent: () => OverridenComponent,
        };

        // when
        const result = render(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="bar" />
            </ComponentOverrideContext.Provider>
        );

        const Counter = await result.findByText(/^Counter:/i);
        const Button = await result.findByText(/Update/i);
        const Foo = await result.findByText(/Foo/i);

        expect(Counter).toHaveTextContent("Counter: 0");
        expect(Foo).toHaveTextContent("bar");

        userEvent.click(Button);

        expect(Counter).toHaveTextContent("Counter: 1");

        result.rerender(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="baz" />
            </ComponentOverrideContext.Provider>
        );

        // then
        expect(Counter).toHaveTextContent("Counter: 1");
        expect(Foo).toHaveTextContent("baz");
    });
});
