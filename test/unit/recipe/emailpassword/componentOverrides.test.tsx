import React from "react";
import { render } from "@testing-library/react";

import { ComponentOverrideContext } from "../../../../lib/ts/components/componentOverride/componentOverrideContext";
import { ComponentOverrideMap } from "../../../../lib/ts/recipe/emailpassword/types";
import { SignUp } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUp";
import { SignUpHeader } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUpHeader";
import { SignInHeader } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signInHeader";
import { EnterEmail } from "../../../../lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/enterEmail";
import { SignIn } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signIn";
import { SignInFooter } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signInFooter";
import { SignInForm } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signInForm";
import { SignUpFooter } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUpFooter";
import { SignUpForm } from "../../../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUpForm";
import { SubmitNewPassword } from "../../../../lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/submitNewPassword";

const makeOverride = jest.fn(() => () => <h1 data-testid="override">Override</h1>);
const WithProvider: React.FC<any> = ({ overrideMap, children }) => {
    return <ComponentOverrideContext.Provider value={overrideMap}>{children}</ComponentOverrideContext.Provider>;
};

describe("EmailPassword overrides", () => {
    const overrides: {
        // Required<T> ensures that we cover all available overrides in tests
        [K in keyof Required<ComponentOverrideMap>]: any;
    } = {
        EmailPasswordSignUpHeader: SignUpHeader,
        EmailPasswordSignInHeader: SignInHeader,
        EmailPasswordEnterEmail: EnterEmail,
        EmailPasswordSignIn: SignIn,
        EmailPasswordSignInFooter: SignInFooter,
        EmailPasswordSignInForm: SignInForm,
        EmailPasswordSignUp: SignUp,
        EmailPasswordSignUpFooter: SignUpFooter,
        EmailPasswordSignUpForm: SignUpForm,
        EmailPasswordSubmitNewPassword: SubmitNewPassword,
    };

    Object.entries(overrides).forEach(([key, Component]) => {
        test(`${key} can be overrode`, async () => {
            // given
            const overrideMap = {
                [key]: makeOverride,
            };

            // Since we do not pass props to component, if the override is not applied
            // we will additionally get errors related to undefined props
            //
            // when
            const result = await render(
                <WithProvider overrideMap={overrideMap}>
                    <Component />
                </WithProvider>
            ).findByTestId("override");

            // then
            expect(result.textContent).toBe("Override");
        });
    });
});
