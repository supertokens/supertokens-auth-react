import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { ComponentOverrideContext } from "../../lib/ts/components/componentOverride/componentOverrideContext";
import { ComponentOverrideMap as EmailPasswordOverrideMap } from "../../lib/ts/recipe/emailpassword/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../../lib/ts/recipe/thirdparty/types";
import { ComponentOverrideMap as EmailVerificationOverrideMap } from "../../lib/ts/recipe/emailverification/types";
import { ComponentOverrideMap as ThirdPartyEmailPasswordOverrideMap } from "../../lib/ts/recipe/thirdpartyemailpassword/types";

import { SignUp } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUp";
import { SignUpHeader } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUpHeader";
import { SignInHeader } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signInHeader";
import { ResetPasswordEmail } from "../../lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/resetPasswordEmail";
import { SignIn } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signIn";
import { SignInFooter } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signInFooter";
import { SignInForm } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signInForm";
import { SignUpFooter as EmailPasswordSignUpFooter } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUpFooter";
import { SignUpForm } from "../../lib/ts/recipe/emailpassword/components/themes/signInAndUp/signUpForm";
import { SubmitNewPassword } from "../../lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/submitNewPassword";
import { SignUpFooter as ThirdPartySignUpFooter } from "../../lib/ts/recipe/thirdparty/components/themes/signInAndUp/signUpFooter";
import { ProvidersForm } from "../../lib/ts/recipe/thirdparty/components/themes/signInAndUp/providersForm";
import { SignInAndUpCallbackTheme } from "../../lib/ts/recipe/thirdparty/components/themes/signInAndUpCallback";
import { SendVerifyEmail } from "../../lib/ts/recipe/emailverification/components/themes/emailVerification/sendVerifyEmail";
import { VerifyEmailLinkClicked } from "../../lib/ts/recipe/emailverification/components/themes/emailVerification/verifyEmailLinkClicked";
import { Header as ThirdPartyEmailPasswordHeader } from "../../lib/ts/recipe/thirdpartyemailpassword/components/themes/signInAndUp/header";
import { SignInAndUpForm } from "../../lib/ts/recipe/thirdpartyemailpassword/components/themes/signInAndUp/signInAndUpForm";

type AllComponentsOverrideMap = EmailPasswordOverrideMap &
    ThirdPartyOverrideMap &
    EmailVerificationOverrideMap &
    ThirdPartyEmailPasswordOverrideMap;

const makeOverride = jest.fn(() => () => <h1 data-testid="override">Override</h1>);
const WithProvider: React.FC<any> = ({ overrideMap, children }) => {
    return <ComponentOverrideContext.Provider value={overrideMap}>{children}</ComponentOverrideContext.Provider>;
};

describe("Theme component overrides", () => {
    const overrides: {
        // Required<T> ensures that we cover all available overrides in tests
        [K in keyof Required<AllComponentsOverrideMap>]: any;
    } = {
        EmailPasswordSignUpHeader: SignUpHeader,
        EmailPasswordSignInHeader: SignInHeader,
        EmailPasswordResetPasswordEmail: ResetPasswordEmail,
        EmailPasswordSignIn: SignIn,
        EmailPasswordSignInFooter: SignInFooter,
        EmailPasswordSignInForm: SignInForm,
        EmailPasswordSignUp: SignUp,
        EmailPasswordSignUpFooter: EmailPasswordSignUpFooter,
        EmailPasswordSignUpForm: SignUpForm,
        EmailPasswordSubmitNewPassword: SubmitNewPassword,
        ThirdPartySignUpFooter: ThirdPartySignUpFooter,
        ThirdPartySignInAndUpProvidersForm: ProvidersForm,
        ThirdPartySignInAndUpCallbackTheme: SignInAndUpCallbackTheme,
        EmailVerificationSendVerifyEmail: SendVerifyEmail,
        EmailVerificationVerifyEmailLinkClicked: VerifyEmailLinkClicked,
        ThirdPartyEmailPasswordHeader: ThirdPartyEmailPasswordHeader,
        ThirdPartyEmailPasswordSignInAndUpForm: SignInAndUpForm,
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
            );

            // then
            expect(await result.findByTestId("override")).toHaveTextContent("Override");
        });
    });
});
