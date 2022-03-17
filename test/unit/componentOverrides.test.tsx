import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { ComponentOverrideContext } from "../../lib/ts/components/componentOverride/componentOverrideContext";
import { ComponentOverrideMap as EmailPasswordOverrideMap } from "../../lib/ts/recipe/emailpassword/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../../lib/ts/recipe/thirdparty/types";
import { ComponentOverrideMap as EmailVerificationOverrideMap } from "../../lib/ts/recipe/emailverification/types";
import { ComponentOverrideMap as ThirdPartyEmailPasswordOverrideMap } from "../../lib/ts/recipe/thirdpartyemailpassword/types";
import { ComponentOverrideMap as PasswordlessOverrideMap } from "../../lib/ts/recipe/passwordless/types";
import { ComponentOverrideMap as ThirdPartyPasswordlessOverrideMap } from "../../lib/ts/recipe/thirdpartypasswordless/types";

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
import { Header as ThirdPartyPasswordlessHeader } from "../../lib/ts/recipe/thirdpartypasswordless/components/themes/signInUp/header";
import { CloseTabScreen } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/closeTabScreen";
import { ComponentOverride } from "../../lib/ts/components/componentOverride/componentOverride";
import { LinkClickedScreen } from "../../lib/ts/recipe/passwordless/components/themes/linkClickedScreen";
import { LinkSent } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/linkSent";
import { UserInputCodeFormFooter } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/userInputCodeFormFooter";
import { UserInputCodeFormHeader } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/userInputCodeFormHeader";
import { UserInputCodeForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/userInputCodeForm";
import { EmailForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/emailForm";
import { SignInUpFooter } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/signInUpFooter";
import { SignInUpHeader } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/signInUpHeader";
import { PhoneForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/phoneForm";
import { EmailOrPhoneForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/emailOrPhoneForm";

type AllComponentsOverrideMap = EmailPasswordOverrideMap &
    ThirdPartyOverrideMap &
    EmailVerificationOverrideMap &
    ThirdPartyEmailPasswordOverrideMap &
    PasswordlessOverrideMap &
    ThirdPartyPasswordlessOverrideMap;

const makeOverride = () => () => <h1 data-testid="override">Override</h1>;
const WithProvider: React.FC<any> = ({ overrideMap, children }) => {
    return <ComponentOverrideContext.Provider value={overrideMap}>{children}</ComponentOverrideContext.Provider>;
};

describe("Theme component overrides", () => {
    const overrides: {
        // Required<T> ensures that we cover all available overrides in tests
        [K in keyof Required<AllComponentsOverrideMap>]: any;
    } = {
        EmailPasswordSignUpHeader_Override: SignUpHeader,
        EmailPasswordSignInHeader_Override: SignInHeader,
        EmailPasswordResetPasswordEmail_Override: ResetPasswordEmail,
        EmailPasswordSignIn_Override: SignIn,
        EmailPasswordSignInFooter_Override: SignInFooter,
        EmailPasswordSignInForm_Override: SignInForm,
        EmailPasswordSignUp_Override: SignUp,
        EmailPasswordSignUpFooter_Override: EmailPasswordSignUpFooter,
        EmailPasswordSignUpForm_Override: SignUpForm,
        EmailPasswordSubmitNewPassword_Override: SubmitNewPassword,
        ThirdPartySignUpFooter_Override: ThirdPartySignUpFooter,
        ThirdPartySignInAndUpProvidersForm_Override: ProvidersForm,
        ThirdPartySignInAndUpCallbackTheme_Override: SignInAndUpCallbackTheme,
        EmailVerificationSendVerifyEmail_Override: SendVerifyEmail,
        EmailVerificationVerifyEmailLinkClicked_Override: VerifyEmailLinkClicked,
        ThirdPartyEmailPasswordHeader_Override: ThirdPartyEmailPasswordHeader,
        PasswordlessEmailForm_Override: EmailForm,
        PasswordlessPhoneForm_Override: PhoneForm,
        PasswordlessEmailOrPhoneForm_Override: EmailOrPhoneForm,
        PasswordlessSignInUpFooter_Override: SignInUpFooter,
        PasswordlessSignInUpHeader_Override: SignInUpHeader,
        PasswordlessUserInputCodeForm_Override: UserInputCodeForm,
        PasswordlessUserInputCodeFormFooter_Override: UserInputCodeFormFooter,
        PasswordlessUserInputCodeFormHeader_Override: UserInputCodeFormHeader,
        PasswordlessLinkSent_Override: LinkSent,
        PasswordlessCloseTabScreen_Override: CloseTabScreen,
        PasswordlessLinkClickedScreen_Override: LinkClickedScreen,
        ThirdPartyPasswordlessHeader_Override: ThirdPartyPasswordlessHeader,
    };

    Object.entries(overrides).forEach(([key, comp]) => {
        test(`${key} can be overrode`, async () => {
            const [Component, props] = comp instanceof Array ? comp : [comp, {}];
            // given
            const overrideMap: Record<string, ComponentOverride<any>> = {
                [key]: makeOverride(),
            };

            // Since we do not pass props to component, if the override is not applied
            // we will additionally get errors related to undefined props
            //
            // when
            const result = await render(
                <WithProvider overrideMap={overrideMap}>
                    <Component {...props} />
                </WithProvider>
            );

            // then
            expect(await result.findByTestId("override")).toHaveTextContent("Override");
        });
    });
});
