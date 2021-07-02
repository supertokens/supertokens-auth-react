import React, { useState } from "react";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withOverride } from "../../../../lib/ts/components/componentOverride/withOverride";
import { ComponentOverrideContext } from "../../../../lib/ts/components/componentOverride/componentOverrideContext";

const OverridenComponentFactory =
    (OriginalComponent: React.FC<{ foo: string }>) =>
    ({ foo }: { foo: string }) => {
        const [useOriginalComponent, setUseOriginalComponent] = useState(false);

        const SwitchButton = () => (
            <button onClick={() => setUseOriginalComponent((useOriginalComponent) => !useOriginalComponent)}>
                Switch
            </button>
        );

        return (
            <>
                {useOriginalComponent ? <OriginalComponent foo={foo} /> : <h1 data-testid="override">Override</h1>}
                <SwitchButton />
            </>
        );
    };

describe("withOverride", () => {
    const DefaultComponent = withOverride("DefaultComponent", ({ foo }: { foo: string }) => {
        const [counter, setCounter] = useState(0);

        return (
            <>
                <span>Counter: {counter}</span>
                <span>Foo: {foo}</span>
                <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
            </>
        );
    });

    test("throw an error if no parent provider is set", async () => {
        // when
        const doRender = () => render(<DefaultComponent foo="bar" />);

        // then
        expect(doRender).toThrowError();
    });

    test("display overriden component if context key matches override key", async () => {
        // given
        const overrides = {
            DefaultComponent: OverridenComponentFactory,
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

    test("preserve component state across rerenders", async () => {
        // given
        const overrides = {
            DefaultComponent: OverridenComponentFactory,
        };

        // when
        const result = render(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponent foo="bar" />
            </ComponentOverrideContext.Provider>
        );

        const OverrideContent = () => result.findByTestId("override");
        const SwitchButton = () => result.findByText(/Switch/i);
        const Counter = () => result.findByText(/^Counter:/i);
        const IncrementButton = () => result.findByText(/Increment/i);

        let overrideContent = await OverrideContent();

        expect(overrideContent).toBeInTheDocument();

        // display original component
        userEvent.click(await SwitchButton());

        expect(overrideContent).not.toBeInTheDocument();
        expect(await Counter()).toHaveTextContent("Counter: 0");

        // set state on original component
        userEvent.click(await IncrementButton());

        expect(await Counter()).toHaveTextContent("Counter: 1");

        // display overriden component
        userEvent.click(await SwitchButton());

        overrideContent = await OverrideContent();

        expect(overrideContent).toBeInTheDocument();

        // display original component
        userEvent.click(await SwitchButton());

        // then
        expect(await Counter()).toHaveTextContent("Counter: 1");
    });

    test("original react behaviour", async () => {
        const First = () => {
            const [counter, setCounter] = useState(0);

            return (
                <>
                    <span>First</span>
                    <span>Counter: {counter}</span>
                    <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
                </>
            );
        };

        const Second = () => {
            return (
                <>
                    <span>Second</span>
                </>
            );
        };

        const SwitchingComponent = () => {
            const [useFirst, setUseFirst] = useState(true);

            return (
                <>
                    {useFirst ? <First /> : <Second />}
                    <button onClick={() => setUseFirst((use) => !use)}>Switch</button>
                </>
            );
        };

        const result = render(<SwitchingComponent />);

        const SwitchButton = () => result.findByText(/Switch/i);
        const FirstHeading = () => result.findByText(/First/i);
        const SecondHeading = () => result.findByText(/Second/i);
        const IncrementFirst = () => result.findByText(/Increment/i);
        const FirstCounter = () => result.findByText(/^Counter:/i);

        expect(await FirstHeading()).toBeInTheDocument();
        expect(await FirstCounter()).toHaveTextContent("Counter: 0");

        userEvent.click(await IncrementFirst());

        expect(await FirstCounter()).toHaveTextContent("Counter: 1");

        userEvent.click(await SwitchButton());

        expect(await SecondHeading()).toBeInTheDocument();

        userEvent.click(await SwitchButton());

        expect(await FirstHeading()).toBeInTheDocument();
        expect(await FirstCounter()).toHaveTextContent("Counter: 1");
    });
});
