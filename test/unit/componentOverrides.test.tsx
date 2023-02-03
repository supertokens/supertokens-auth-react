import React from "react";
import "@testing-library/jest-dom";
import { render, within } from "@testing-library/react";

import { ComponentOverrideContext } from "../../lib/ts/components/componentOverride/componentOverrideContext";
import { ComponentOverrideMap as EmailPasswordOverrideMap } from "../../lib/ts/recipe/emailpassword/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../../lib/ts/recipe/thirdparty/types";
import { ComponentOverrideMap as EmailVerificationOverrideMap } from "../../lib/ts/recipe/emailverification/types";
import { ComponentOverrideMap as ThirdPartyEmailPasswordOverrideMap } from "../../lib/ts/recipe/thirdpartyemailpassword/types";
import { ComponentOverrideMap as PasswordlessOverrideMap } from "../../lib/ts/recipe/passwordless/types";
import { ComponentOverrideMap as ThirdPartyPasswordlessOverrideMap } from "../../lib/ts/recipe/thirdpartypasswordless/types";

import "@testing-library/jest-dom";
import EmailPassword from "../../lib/ts/recipe/emailpassword/recipe";
import { SessionContextType } from "../../lib/ts/recipe/session";
import Session from "../../lib/ts/recipe/session/recipe";
import SuperTokens from "../../lib/ts/superTokens";
import ThirdPartyEmailPassword from "../../lib/ts/recipe/thirdpartyemailpassword/recipe";
import {
    SignInAndUp as SignInAndUpThirdpartyEmailPassword,
    Github,
    ThirdpartyEmailPasswordComponentsOverrideProvider,
    ThirdPartySignInAndUpCallback,
} from "../../lib/ts/recipe/thirdpartyemailpassword";
import {
    SignInAndUp as SignInAndUpEmailPassword,
    EmailPasswordComponentsOverrideProvider,
} from "../../lib/ts/recipe/emailpassword";

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
import { SignInAndUpHeader as ThirdPartySignInAndUpHeader } from "../../lib/ts/recipe/thirdparty/components/themes/signInAndUp/signInAndUpHeader";
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
import ThirdParty from "../../lib/ts/recipe/thirdparty/recipe";
import { Google, SignInAndUpCallback, ThirdpartyComponentsOverrideProvider } from "../../lib/ts/recipe/thirdparty";

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
        ThirdPartySignInAndUpHeader_Override: ThirdPartySignInAndUpHeader,
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
            const [Component, props] =
                comp instanceof Array
                    ? comp
                    : [
                          comp,
                          {
                              // We are adding these to avoid undefined errors while getting styles in ThemeBase
                              config: {
                                  rootStyle: ``,
                                  linkClickedScreenFeature: { style: `` },
                                  signInUpFeature: { style: `` },
                                  signInAndUpFeature: {
                                      style: ``,
                                      signUpForm: { style: `` },
                                      signInForm: { style: `` },
                                  },
                                  resetPasswordUsingTokenFeature: {
                                      submitNewPasswordForm: { style: `` },
                                      enterEmailForm: { style: `` },
                                  },
                                  verifyEmailLinkClickedScreen: { style: `` },
                                  sendVerifyEmailScreen: { style: `` },
                              },
                          },
                      ];

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

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn(),
    getAccessTokenPayloadSecurely: jest.fn(),
    doesSessionExist: jest.fn(),
    validateClaims: jest.fn(),
    validateGlobalClaimsAndHandleSuccessRedirection: jest.fn(),
};

const setMockResolvesSession = (ctx: SessionContextType) => {
    if (ctx.loading === true) {
        // We "simulate" loading by returning these promises that won't ever resolve
        MockSession.getUserId.mockReturnValue(new Promise<any>(() => {}));
        MockSession.getAccessTokenPayloadSecurely.mockReturnValue(new Promise<any>(() => {}));
        MockSession.doesSessionExist.mockReturnValue(new Promise<any>(() => {}));
        MockSession.validateClaims.mockReturnValue(new Promise<any>(() => {}));
    } else {
        MockSession.getUserId.mockResolvedValue(ctx.userId);
        MockSession.getAccessTokenPayloadSecurely.mockResolvedValue(ctx.accessTokenPayload);
        MockSession.doesSessionExist.mockResolvedValue(ctx.doesSessionExist);
        MockSession.validateClaims.mockReturnValue(ctx.invalidClaims);
    }
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("Components override per recipe provider", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        SuperTokens.reset();
        EmailPassword.reset();
        ThirdPartyEmailPassword.reset();
        Github.reset();

        SuperTokens.init({
            appInfo: {
                apiBasePath: "/auth",
                apiDomain: "http://localhost:3001",
                appName: "JestTest",
                websiteBasePath: "/auth",
                websiteDomain: "http://localhost:3000",
            },
            recipeList: [
                ThirdPartyEmailPassword.init({
                    signInAndUpFeature: {
                        providers: [Github.init()],
                    },
                    useShadowDom: false,
                }),
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [Google.init()],
                    },
                    useShadowDom: false,
                }),
                EmailPassword.init({
                    useShadowDom: false,
                }),
            ],
        });
        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            invalidClaims: [],
            doesSessionExist: false,
            loading: false,
        });
    });

    it("Should not affect other recipes components when the same component is overridden", async () => {
        const result = render(
            <EmailPasswordComponentsOverrideProvider
                components={{
                    EmailPasswordSignInHeader_Override: () => <div>Override emailpassword</div>,
                }}>
                <SignInAndUpThirdpartyEmailPassword redirectOnSessionExists={false} />
            </EmailPasswordComponentsOverrideProvider>
        );

        expect(await result.findByText("Sign In")).toBeInTheDocument();
        expect(await result.queryByText("Override emailpassword")).not.toBeInTheDocument();
    });

    it("Should not affect each others components when two recipes override the same component", async () => {
        const emailPasswordKey = "EmailPassword_Override";
        const thirdpartyEmailPasswordKey = "ThirdpartyEmailPassword_Override";

        const result = render(
            <EmailPasswordComponentsOverrideProvider
                components={{
                    EmailPasswordSignInHeader_Override: () => (
                        <div data-testid="emailpassword-override">{emailPasswordKey}</div>
                    ),
                }}>
                <ThirdpartyEmailPasswordComponentsOverrideProvider
                    components={{
                        EmailPasswordSignInHeader_Override: () => (
                            <div data-testid="thirdpartyemailpassword-override">{thirdpartyEmailPasswordKey}</div>
                        ),
                    }}>
                    <div data-testid="emailpassword-wrapper">
                        <SignInAndUpEmailPassword redirectOnSessionExists={false} />
                    </div>
                    <div data-testid="thirdpartyemailpassword-wrapper">
                        <SignInAndUpThirdpartyEmailPassword redirectOnSessionExists={false} />
                    </div>
                </ThirdpartyEmailPasswordComponentsOverrideProvider>
            </EmailPasswordComponentsOverrideProvider>
        );

        expect(await result.findAllByText(emailPasswordKey)).toHaveLength(1);
        expect(await result.findAllByText(thirdpartyEmailPasswordKey)).toHaveLength(1);

        expect(
            await within(await result.getByTestId("emailpassword-wrapper")).getByText(emailPasswordKey)
        ).toBeInTheDocument();

        expect(
            await within(await result.getByTestId("thirdpartyemailpassword-wrapper")).getByText(
                thirdpartyEmailPasswordKey
            )
        ).toBeInTheDocument();
    });

    it("Should not affect each others components when two recipes override the same component", async () => {
        const thirdPartyText = "thirdparty";
        const thirdpartyEmailPasswordText = "thirpartyemailpassword";
        SuperTokens.getInstanceOrThrow().redirectToAuth = jest.fn();

        const result = render(
            <ThirdpartyComponentsOverrideProvider
                components={{
                    ThirdPartySignInAndUpCallbackTheme_Override: () => (
                        <div data-testid="thirdparty-override"> {thirdPartyText} </div>
                    ),
                }}>
                <ThirdpartyEmailPasswordComponentsOverrideProvider
                    components={{
                        ThirdPartySignInAndUpCallbackTheme_Override: () => (
                            <div data-testid="thirdpartyemailpassword-override"> {thirdpartyEmailPasswordText} </div>
                        ),
                    }}>
                    <div data-testid="thirdparty-wrapper">
                        <SignInAndUpCallback />
                    </div>
                    <div data-testid="thirdpartyemailpassword-wrapper">
                        <ThirdPartySignInAndUpCallback />
                    </div>
                </ThirdpartyEmailPasswordComponentsOverrideProvider>
            </ThirdpartyComponentsOverrideProvider>
        );

        expect(await result.findAllByText(thirdPartyText)).toHaveLength(1);
        expect(await result.findAllByText(thirdpartyEmailPasswordText)).toHaveLength(1);

        expect(within(result.getByTestId("thirdparty-wrapper")).getByText(thirdPartyText)).toBeInTheDocument();
        expect(
            within(result.getByTestId("thirdpartyemailpassword-wrapper")).getByText(thirdpartyEmailPasswordText)
        ).toBeInTheDocument();
    });
});
