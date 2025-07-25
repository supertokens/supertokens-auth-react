import React from "react";
import "@testing-library/jest-dom";
import { render, within } from "@testing-library/react";

import { ComponentOverrideContext } from "../../lib/ts/components/componentOverride/componentOverrideContext";
import { ComponentOverrideMap as EmailPasswordOverrideMap } from "../../lib/ts/recipe/emailpassword/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../../lib/ts/recipe/thirdparty/types";
import { ComponentOverrideMap as EmailVerificationOverrideMap } from "../../lib/ts/recipe/emailverification/types";
import { ComponentOverrideMap as PasswordlessOverrideMap } from "../../lib/ts/recipe/passwordless/types";
import { ComponentOverrideMap as TOTPOverrideMap } from "../../lib/ts/recipe/totp/types";
import { ComponentOverrideMap as MFAOverrideMap } from "../../lib/ts/recipe/multifactorauth/types";
import { ComponentOverrideMap as AuthRecipeOverrideMap } from "../../lib/ts/recipe/authRecipe/types";
import { ComponentOverrideMap as OAuth2ProviderOverrideMap } from "../../lib/ts/recipe/oauth2provider/types";
import { ComponentOverrideMap as WebauthnOverrideMap } from "../../lib/ts/recipe/webauthn/types";

import "@testing-library/jest-dom";
import EmailPassword from "../../lib/ts/recipe/emailpassword/recipe";
import { SessionContextType } from "../../lib/ts/recipe/session";
import Session from "../../lib/ts/recipe/session/recipe";
import SuperTokens from "../../lib/ts/superTokens";

import { ResetPasswordEmail } from "../../lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/resetPasswordEmail";
import { SignInForm } from "../../lib/ts/recipe/emailpassword/components/themes/signIn";
import { SignUpForm } from "../../lib/ts/recipe/emailpassword/components/themes/signUp";
import { SubmitNewPassword } from "../../lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/submitNewPassword";
import { ProvidersForm } from "../../lib/ts/recipe/thirdparty/components/themes/signInAndUp/providersForm";
import { SignInAndUpCallbackTheme } from "../../lib/ts/recipe/thirdparty/components/themes/signInAndUpCallback";
import { SendVerifyEmail } from "../../lib/ts/recipe/emailverification/components/themes/emailVerification/sendVerifyEmail";
import { VerifyEmailLinkClicked } from "../../lib/ts/recipe/emailverification/components/themes/emailVerification/verifyEmailLinkClicked";
import { ComponentOverride } from "../../lib/ts/components/componentOverride/componentOverride";
import { LinkClickedScreen } from "../../lib/ts/recipe/passwordless/components/themes/linkClickedScreen";
import { LinkSent } from "../../lib/ts/recipe/passwordless/components/themes/linkSent/index";
import { ContinueWithPasswordlessTheme } from "../../lib/ts/recipe/passwordless/components/themes/continueWithPasswordless";
import { UserInputCodeForm } from "../../lib/ts/recipe/passwordless/components/themes/userInputCodeForm/userInputCodeFormScreen";
import { UserInputCodeFormHeader } from "../../lib/ts/recipe/passwordless/components/themes/userInputCodeForm/userInputCodeFormHeader";
import { UserInputCodeFormFooter } from "../../lib/ts/recipe/passwordless/components/themes/userInputCodeForm/userInputCodeFormFooter";
import { EmailForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/emailForm";
import { PhoneForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/phoneForm";
import { EmailOrPhoneForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUp/emailOrPhoneForm";
import { EPComboEmailForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUpEPCombo/emailForm";
import { EPComboEmailOrPhoneForm } from "../../lib/ts/recipe/passwordless/components/themes/signInUpEPCombo/emailOrPhoneForm";

import { MFAFooter } from "../../lib/ts/recipe/passwordless/components/themes/mfa/mfaFooter";
import { MFAHeader } from "../../lib/ts/recipe/passwordless/components/themes/mfa/mfaHeader";
import { MFAOTPFooter } from "../../lib/ts/recipe/passwordless/components/themes/mfa/mfaOTPFooter";
import { MFAOTPHeader } from "../../lib/ts/recipe/passwordless/components/themes/mfa/mfaOTPHeader";
import { LoadingScreen as MFAOTPLoadingScreen } from "../../lib/ts/recipe/passwordless/components/themes/mfa/loadingScreen";
import { BlockedScreen } from "../../lib/ts/recipe/totp/components/themes/mfa/blockedScreen";
import { CodeForm } from "../../lib/ts/recipe/totp/components/themes/mfa/totpCodeForm";
import { CodeVerificationFooter } from "../../lib/ts/recipe/totp/components/themes/mfa/totpCodeVerificationFooter";
import { CodeVerificationHeader } from "../../lib/ts/recipe/totp/components/themes/mfa/totpCodeVerificationHeader";
import { DeviceInfoSection } from "../../lib/ts/recipe/totp/components/themes/mfa/totpDeviceInfoSection";
import { DeviceSetupFooter } from "../../lib/ts/recipe/totp/components/themes/mfa/totpDeviceSetupFooter";
import { DeviceSetupHeader } from "../../lib/ts/recipe/totp/components/themes/mfa/totpDeviceSetupHeader";
import { LoadingScreen } from "../../lib/ts/recipe/totp/components/themes/mfa/loadingScreen";
import { FactorChooserFooter } from "../../lib/ts/recipe/multifactorauth/components/themes/factorChooser/factorChooserFooter";
import { FactorChooserHeader } from "../../lib/ts/recipe/multifactorauth/components/themes/factorChooser/factorChooserHeader";
import { FactorList } from "../../lib/ts/recipe/multifactorauth/components/themes/factorChooser/factorList";
import { FactorOption } from "../../lib/ts/recipe/multifactorauth/components/themes/factorChooser/factorOption";
import { AuthPageComponentList, AuthPageFooter, AuthPageHeader } from "../../lib/ts/ui";
import { OAuth2LogoutScreenInner } from "../../lib/ts/recipe/oauth2provider/components/themes/oauth2LogoutScreen/OAuth2LogoutScreenInner";
import { ContinueWithPasskeyWithOverride } from "../../lib/ts/recipe/webauthn/components/themes/continueWithPasskey";
import { PasskeyNotSupportedError } from "../../lib/ts/recipe/webauthn/components/themes/error/passkeyNotSupportedError";
import { PasskeyRecoveryEmailSent } from "../../lib/ts/recipe/webauthn/components/themes/sendRecoveryEmail/emailSent";
import {
    WebauthnRecoverAccount,
    WebauthnRecoverAccountForm,
} from "../../lib/ts/recipe/webauthn/components/themes/sendRecoveryEmail/recoverAccountForm";
import { PasskeyConfirmation } from "../../lib/ts/recipe/webauthn/components/themes/signUp/confirmation";
import { PasskeyFeatureBlock } from "../../lib/ts/recipe/webauthn/components/themes/signUp/featureBlocks";
import { ContinueWithoutPasskey } from "../../lib/ts/recipe/webauthn/components/themes/signUp/continueWithoutPasskey";
import { SignUpFormInner } from "../../lib/ts/recipe/webauthn/components/themes/signUp/signUpForm";
import { SignUpSomethingWentWrong } from "../../lib/ts/recipe/webauthn/components/themes/signUp/somethingWentWrong";

type AllComponentsOverrideMap = AuthRecipeOverrideMap &
    EmailPasswordOverrideMap &
    ThirdPartyOverrideMap &
    EmailVerificationOverrideMap &
    PasswordlessOverrideMap &
    TOTPOverrideMap &
    MFAOverrideMap &
    OAuth2ProviderOverrideMap &
    WebauthnOverrideMap;

const makeOverride = () => () => <h1 data-testid="override">Override</h1>;
const WithProvider: React.FC<any> = ({ overrideMap, children }) => {
    return <ComponentOverrideContext.Provider value={overrideMap}>{children}</ComponentOverrideContext.Provider>;
};

describe("Theme component overrides", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        SuperTokens.reset();

        SuperTokens.init({
            useShadowDom: false,
            appInfo: {
                apiBasePath: "/auth",
                apiDomain: "http://localhost:3001",
                appName: "JestTest",
                websiteBasePath: "/auth",
                websiteDomain: "http://localhost:3000",
            },
            recipeList: [],
        });
    });

    const overrides: {
        // Required<T> ensures that we cover all available overrides in tests
        [K in keyof Required<AllComponentsOverrideMap>]: any;
    } = {
        EmailPasswordResetPasswordEmail_Override: ResetPasswordEmail,
        EmailPasswordSignInForm_Override: SignInForm,
        EmailPasswordSignUpForm_Override: SignUpForm,
        EmailPasswordSubmitNewPassword_Override: SubmitNewPassword,
        ThirdPartySignInAndUpProvidersForm_Override: ProvidersForm,
        ThirdPartySignInAndUpCallbackTheme_Override: SignInAndUpCallbackTheme,
        EmailVerificationSendVerifyEmail_Override: SendVerifyEmail,
        EmailVerificationVerifyEmailLinkClicked_Override: VerifyEmailLinkClicked,
        PasswordlessEmailForm_Override: EmailForm,
        PasswordlessPhoneForm_Override: PhoneForm,
        PasswordlessEmailOrPhoneForm_Override: EmailOrPhoneForm,
        PasswordlessUserInputCodeForm_Override: UserInputCodeForm,
        PasswordlessUserInputCodeFormFooter_Override: UserInputCodeFormFooter,
        PasswordlessUserInputCodeFormHeader_Override: UserInputCodeFormHeader,
        PasswordlessLinkSent_Override: LinkSent,
        PasswordlessLinkClickedScreen_Override: LinkClickedScreen,
        PasswordlessContinueWithPasswordless_Override: ContinueWithPasswordlessTheme,
        PasswordlessMFAFooter_Override: MFAFooter,
        PasswordlessEPComboEmailForm_Override: EPComboEmailForm,
        PasswordlessEPComboEmailOrPhoneForm_Override: EPComboEmailOrPhoneForm,
        PasswordlessMFAHeader_Override: MFAHeader,
        PasswordlessMFAOTPFooter_Override: MFAOTPFooter,
        PasswordlessMFAOTPHeader_Override: MFAOTPHeader,
        PasswordlessMFAOTPLoadingScreen_Override: MFAOTPLoadingScreen,
        TOTPBlockedScreen_Override: BlockedScreen,
        TOTPCodeForm_Override: CodeForm,
        TOTPCodeVerificationFooter_Override: CodeVerificationFooter,
        TOTPCodeVerificationHeader_Override: CodeVerificationHeader,
        TOTPDeviceInfoSection_Override: DeviceInfoSection,
        TOTPDeviceSetupFooter_Override: DeviceSetupFooter,
        TOTPDeviceSetupHeader_Override: DeviceSetupHeader,
        TOTPLoadingScreen_Override: LoadingScreen,
        MFAFactorChooserFooter_Override: FactorChooserFooter,
        MFAFactorChooserHeader_Override: FactorChooserHeader,
        MFAFactorList_Override: [FactorList, { availableFactors: [] }],
        MFAFactorOption_Override: [FactorOption, { logo: () => <p>!</p> }],
        AuthPageComponentList_Override: AuthPageComponentList,
        AuthPageFooter_Override: AuthPageFooter,
        AuthPageHeader_Override: AuthPageHeader,
        OAuth2LogoutScreenInner_Override: OAuth2LogoutScreenInner,
        WebauthnContinueWithPasskey_Override: ContinueWithPasskeyWithOverride,
        WebauthnPasskeyNotSupportedError_Override: PasskeyNotSupportedError,
        WebauthnPasskeyRecoveryEmailSent_Override: PasskeyRecoveryEmailSent,
        WebauthnRecoverAccountForm_Override: WebauthnRecoverAccountForm,
        WebauthnRecoverAccount_Override: WebauthnRecoverAccount,
        WebauthnPasskeyConfirmation_Override: PasskeyConfirmation,
        WebauthnPasskeyFeatureBlock_Override: PasskeyFeatureBlock,
        WebauthnContinueWithoutPasskey_Override: ContinueWithoutPasskey,
        WebauthnPasskeySignUpForm_Override: SignUpFormInner,
        WebauthnPasskeySignUpSomethingWentWrong_Override: SignUpSomethingWentWrong,
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
                                  oauth2LogoutScreen: { style: `` },
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
