import React from "react";
import { withOverride } from "../../../../lib/ts/components/componentOverride/withOverride";
import { render } from "@testing-library/react";
import { ComponentOverrideContext } from "../../../../lib/ts/components/componentOverride/componentOverrideContext";

describe("withOverride", () => {
    const DefaultComponent = () => <h1 data-testid="heading">Default</h1>;
    const DefaultComponentOverride = withOverride("DefaultComponent", DefaultComponent);

    test("throw an error if no parent provider is set", async () => {
        // when
        const doRender = () => render(<DefaultComponentOverride />);

        // then
        expect(doRender).toThrowError();
    });

    test("display overriden component if context key matches override key", async () => {
        // given
        const ComponentOverrideFactory = jest.fn(() => () => <h1 data-testid="heading">Override</h1>);
        const overrides = {
            DefaultComponent: ComponentOverrideFactory,
        };

        // when
        const result = render(
            <ComponentOverrideContext.Provider value={overrides}>
                <DefaultComponentOverride />
            </ComponentOverrideContext.Provider>
        );

        const heading = await result.findByTestId("heading");

        // then
        expect(ComponentOverrideFactory).toHaveBeenCalledWith(DefaultComponent);
        expect(heading.textContent).toEqual("Override");
    });
});
