# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

## [0.48.0] - 2024-10-07

### Fixes

-   Fixed an issue where the `AuthPage` was using full-page redirects to navigate to the password reset page if both emailpassword and passwordless were enabled.

### Changes

-   Added the `OAuth2Provider` recipe
-   Changed the input types and default implementation of `AuthPageHeader` to show the client information in OAuth2 flows
-   Expanded an error message in `AuthPage` to help with common errors

### Breaking changes

-   Now only supporting FDI 4.0 (Node >= 24.0.0)
-   All `getRedirectionURL` functions now also get a new `tenantIdFromQueryParams` prop
    -   This is used in OAuth2 + Multi-tenant flows.
    -   This should be safe to ignore if:
        -   You are not using those recipes
        -   You have a custom `getTenantId` implementation
        -   You are not customizing paths of the pages handled by SuperTokens.
    -   This is used to keep the `tenantId` query param during internal redirections between pages handled by the SDK.
    -   If you have custom paths, you should set the tenantId queryparam based on this. (See migrations below for more details)
-   Added a new `shouldTryLinkingToSessionUser` flag to sign in/up related function inputs:
    -   No action is needed if you are not using MFA/session based account linking.
    -   If you are implementing MFA:
        -   Plase set this flag to `false` (or leave as undefined) during first factor sign-ins
        -   Please set this flag to `true` for secondary factors.
        -   Please forward this flag to the original implementation in any of your overrides.
    -   Changed functions:
        -   `EmailPassword`:
            -   `signIn`, `signUp`: both override and callable functions
        -   `ThirdParty`:
            -   `getAuthorisationURLWithQueryParamsAndSetState`: both override and callable function
            -   `redirectToThirdPartyLogin`: callable function takes this flag as an optional input (it defaults to false on the backend)
        -   `Passwordless`:
            -   Functions overrides: `consumeCode`, `resendCode`, `createCode`, `setLoginAttemptInfo`, `getLoginAttemptInfo`
            -   Calling `createCode` and `setLoginAttemptInfo` take this flag as an optional input (it defaults to false on the backend)
-   Changed the default implementation of `getTenantId` to default to the `tenantId` query parameter (if present) then falling back to the public tenant instead of always defaulting to the public tenant
-   We now disable session based account linking in the magic link based flow in passwordless by default
    -   This is to make it function more consistently instead of only working if the link was opened on the same device
    -   You can override by overriding the `consumeCode` function in the Passwordless Recipe

### Migration

#### tenantIdFromQueryParams in getRedirectionURL

Before:

```ts
EmailPassword.init({
    async getRedirectionURL(context) {
        if (context.action === "RESET_PASSWORD") {
            return `/reset-password`;
        }
        return "";
    },
});
```

After:

```ts
EmailPassword.init({
    async getRedirectionURL(context) {
        return `/reset-password?tenantId=${context.tenantIdFromQueryParams}`;
    },
});
```

#### Session based account linking for magic link based flows

You can re-enable linking by overriding the `consumeCode` function in the passwordless recipe and setting `shouldTryLinkingToSessionUser` to `true`.

```ts
Passwordless.init({
    override: {
        functions: (original) => {
            return {
                ...original,
                consumeCode: async (input) => {
                    // Please note that this is means that the session is required and will cause an error if it is not present
                    return original.consumeCode({ ...input, shouldTryLinkingWithSessionUser: true });
                },
            };
        },
    },
});
```

## [0.47.1] - 2024-09-18

### Fixes

-   Fixed an issue where we showed the "continue with passwordless" button during sign-in even if email-based passwordless was disabled by the tenant configuration.

## [0.47.0] - 2024-09-02

### Breaking changes

Redesigned the pre-built UI with a modern monochrome aesthetic, creating a cleaner and more unified visual experience. Please double check any custom styles you added still looks good with the new UI.

### Details

-   Changed a lot of the default styles to fit the new UI
-   `--palette-textTitle` changed from `rgb(34, 34, 34)` to `rgb(0, 0, 0)`
-   `--palette-textLabel` changed from rgb`(34, 34, 34)` to `rgb(0, 0, 0)`
-   `--palette-textInput` changed from `rgb(34, 34, 34)` to `rgb(0, 0, 0)`
-   `--palette-textPrimary` changed from `rgb(101, 101, 101)` to `rgb(128, 128, 128)`
-   `--palette-textLink` changed from `rgb(0, 118, 255)` to `rgb(0, 122, 255)`
-   `--palette-textGray` changed from `rgb(128, 128, 128)` to `rgb(54, 54, 54)`
-   Adjusted the layout of the provider buttons. Now:
    -   The logo is aligned to the left, and the text is centered within the entire button, enhancing visual balance and consistency across different button text lengths.
    -   The button now has a fixed height of 40px.
    -   We add an animation to the button when hovering over it if the text is too long.
-   Changed the Email Icon used in the "Verify Email" UI
-   Changed the SMS Icon used in the "Link sent to phone" UI
-   Changed the button arrow icons
-   Updated some translation strings to fit the new UI
    -   `EMAIL_VERIFICATION_SEND_TITLE`
    -   `PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL`

## [0.46.0] - 2024-08-26

### Breaking changes

-   The prebuilt UI now clears the login attempt info if the stored data doesn't contain all the required properties. This should help migration from a custom UI to the prebuilt UI.
-   Changed `redirectToFactor` to accept an object instead of multiple arguments.
-   Changed `redirectToFactorChooser` to accept an object instead of multiple arguments.
-   Made MFA related screens do a success redirection if MFA is already completed and the `stepUp` query param is not set to `true`.
    -   `redirectToFactorChooser` now accepts a `stepUp` option to set the `stepUp` query param.
    -   `redirectToFactor` now accepts a `stepUp` option to set the `stepUp` query param.

### Fixes

-   Fixed an issue where the `Session` recipe was not allowed in the pre-built UI list (it's still a no-op, but it shouldn't be a type issue)

## [0.45.1] - 2024-08-09

### Changes

-   Now we only update the session context if the object changes by value. This optimization should help reduce unnecessary re-renders.

## [0.45.0] - 2024-07-31

### Breaking changes

-   Updated the font and font-weights in the default styles
-   We no longer load the Rubik font by default

### Fixes

-   Now the error prop should be updated in override components.

## [0.44.0] - 2024-07-15

-   Removes the default `maxAgeInSeconds` value (previously 300 seconds) in EmailVerification Claim. If the claim value is true and `maxAgeInSeconds` is not provided, it will not be refreshed.

## [0.43.1] - 2024-07-15

-   Fixes to e2e test

## [0.43.0] - 2024-06-25

### Changes

-   Updated SAML third-party provider to use logo based on the provider name

## [0.42.3] - 2024-06-24

### Changes

-   Now we only update the session context if the object changes by value. This optimization should help reduce unnecessary re-renders.

## [0.42.2] - 2024-05-29

### Changes

-   Updating publish script to update to the lib on chromatic

## [0.42.1] - 2024-05-29

### Changes

-   Re-built docs folder

## [0.42.0] - 2024-05-24

### Breaking changes

-   Removed `ThirdPartyEmailPassword` and `ThirdPartyPasswordless` recipes.
-   `EmailPassword` recipe:

    -   Removed embeddable components: `SignInUp`, `SignInAndUpTheme`
    -   Removed overridable components: `EmailPasswordSignIn`, `EmailPasswordSignInFooter`, `EmailPasswordSignInHeader`, `EmailPasswordSignUp`, `EmailPasswordSignUpFooter`, `EmailPasswordSignUpHeader`
    -   Moved `useShadowDom`, `defaultToSignUp`, `privacyPolicyLink`, `termsOfServiceLink` from the config to the root configuration passed to `SuperTokens.init`.

-   `Passwordless` recipe:

    -   Removed embeddable components: `SignInUp`
    -   Removed overrideable components: `PasswordlessSignInUpHeader_Override`, `PasswordlessSignInUpFooter_Override`
    -   Removed the `guessInternationPhoneNumberFromInputPhoneNumber` configurable callback, since now the user sets if they are entering email or a phone number explicitly
    -   Moved `useShadowDom`, `privacyPolicyLink`, `termsOfServiceLink` from the config to the root configuration passed to `SuperTokens.init`.
    -   Changed the UX of the contactinfo entry form for `EMAIL_OR_PHONE`
    -   Added `defaultToEmail` configuration option, which decides if the contact info input form starts in the email or phone state if the `contactMethod` is set to `EMAIL_OR_PHONE`

-   `ThirdParty` recipe:

    -   Removed embeddable components: `SignInAndUp`
    -   Removed overridable components: `ThirdPartySignInAndUpHeader`, `ThirdPartySignUpFooter`
    -   Moved `useShadowDom`, `privacyPolicyLink`, `termsOfServiceLink` from the config to the root configuration passed to `SuperTokens.init`.

-   Removed `SESSION_ALREADY_EXISTS` event from auth recipes and moved it into the `Session` recipe
-   Added new keys to `data-supertokens` props of several elements
-   Updated some styles to work with the updated UI structure
-   Renamed translation strings to reflect the new component/UI structure:
    -   `EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK` instead of `EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK`
    -   `AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP` instead of `PWLESS_SIGN_IN_UP_HEADER_TITLE` and `THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE`
    -   `AUTH_PAGE_HEADER_TITLE_SIGN_IN` instead of `EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE`
    -   `AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START` instead of `EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START`
    -   `AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK` instead of `EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK`
    -   `AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END` instead of `EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END`
    -   `AUTH_PAGE_HEADER_TITLE_SIGN_UP` instead of `EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE`
    -   `AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START` instead of `EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START`
    -   `AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK` instead of `EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK`
    -   `AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END` instead of `EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END`
    -   `AUTH_PAGE_FOOTER_START` instead of `EMAIL_PASSWORD_SIGN_UP_FOOTER_START`, `PWLESS_SIGN_IN_UP_FOOTER_START` and `THIRD_PARTY_SIGN_IN_UP_FOOTER_START`
    -   `AUTH_PAGE_FOOTER_TOS` instead of: `EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS`, `PWLESS_SIGN_IN_UP_FOOTER_TOS` and `THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS`
    -   `AUTH_PAGE_FOOTER_AND` instead of `EMAIL_PASSWORD_SIGN_UP_FOOTER_AND`, `PWLESS_SIGN_IN_UP_FOOTER_AND` and `THIRD_PARTY_SIGN_IN_UP_FOOTER_AND`
    -   `AUTH_PAGE_FOOTER_PP` instead of `EMAIL_PASSWORD_SIGN_UP_FOOTER_PP`, `PWLESS_SIGN_IN_UP_FOOTER_PP` and `THIRD_PARTY_SIGN_IN_UP_FOOTER_PP`
    -   `AUTH_PAGE_FOOTER_END` instead of `EMAIL_PASSWORD_SIGN_UP_FOOTER_END`, `PWLESS_SIGN_IN_UP_FOOTER_END` and `THIRD_PARTY_SIGN_IN_UP_FOOTER_END`

### Changes

-   Added overrideable components:
    -   General: `AuthPageComponentList`, `AuthPageHeader`, `AuthPageFooter`.
        -   These can be overridden by using `AuthRecipeComponentsOverrideContextProvider`
    -   `Passwordless`: `PasswordlessContinueWithPasswordless_Override`
-   Added new embeddable components:
    -   General: `AuthPage` and `AuthPageTheme`
    -   `EmailPassword`: `SignInTheme`, `SignUpTheme`
-   Added a new `style` prop to the root level config

### Migration guide

#### Removed recipes

-   If you were using `ThirdPartyEmailPassword`, you should now init `ThirdParty` and `EmailPassword` recipes separately. The config for the individual recipes are mostly the same, except the syntax may be different. Check our recipe guides for [ThirdParty](https://supertokens.com/docs/thirdparty/introduction) and [EmailPassword](https://supertokens.com/docs/emailpassword/introduction) for more information.

-   If you were using `ThirdPartyPasswordless`, you should now init `ThirdParty` and `Passwordless` recipes separately. The config for the individual recipes are mostly the same, except the syntax may be different. Check our recipe guides for [ThirdParty](https://supertokens.com/docs/thirdparty/introduction) and [Passwordless](https://supertokens.com/docs/passwordless/introduction) for more information.

#### Moved configuration options

Several configuration options (`useShadowDom`, `defaultToSignUp`, `privacyPolicyLink`, `termsOfServiceLink`) were moved to the root configuration (the one passed directly to `SuperTokens.init`) out of recipe specific configs. The function of these props remain identical, the only necessary migration is moving them:

Before:

```tsx
SuperTokens.init({
    appInfo: {
        // appInfo
    },
    recipeList: [
        EmailPassword.init({
            useShadowDom: false,
            signInAndUpFeature: {
                defaultToSignUp: true,
                signUpForm: {
                    privacyPolicyLink: "http://example.com",
                    termsOfServiceLink: "http://example.com",
                },
            },
        }),
        Session.init(),
    ],
});
```

After:

```tsx
SuperTokens.init({
    appInfo: {
        // appInfo
    },
    useShadowDom: false,
    defaultToSignUp: true,
    privacyPolicyLink: "http://example.com",
    termsOfServiceLink: "http://example.com",
    recipeList: [EmailPassword.init(), Session.init()],
});
```

#### Removed embeddable components

The auth page related embeddable components (`SignInAndUp`, `SignInUp`) and the related theme components were removed. We instead recommend you to use the new `AuthPage` component with the appropriate pre-built UI objects and factorsIds set. For more information check the following [guide](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/embed-sign-in-up-form)

Before:

```tsx
import { SignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";

const Component = () => {
    const navigate = useNavigate();

    return <SignInAndUp navigate={navigate} />;
};
```

After:

```tsx
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { AuthPage } from "supertokens-auth-react/ui";

const Component = () => {
    const navigate = useNavigate();

    return <AuthPage preBuiltUIList={[PasswordlessPreBuiltUI]} factors={["otp-phone"]} navigate={navigate} />;
};
```

#### Updated styles

Some parts of our default styles have been changed, including some changes to the `data-supertokens` props added to elements. Since customizations can take many forms we cannot give you exact guidance on how/what needs to change. In almost all cases, no updates should be required, but please check that your custom styles still work as you expect.

## [0.41.1] - 2024-05-13

### Fixes

-   Custom `inputComponents` (in sign in/up form fields) now get reference-stable callbacks.

## [0.41.0] - 2024-05-09

### Breaking changes

The `shouldDoInterceptionBasedOnUrl` function now returns true:

-   If sessionTokenBackendDomain is a valid subdomain of the URL's domain. This aligns with the behavior of browsers when sending cookies to subdomains.
-   Even if the ports of the URL you are querying are different compared to the apiDomain's port ot the sessionTokenBackendDomain port (as long as the hostname is the same, or a subdomain of the sessionTokenBackendDomain): #217

## [0.40.1] - 2024-04-29

### CI changes

-   Changed an internal test script to fix a dependency issue in CI

## [0.40.0] - 2024-04-15

### Breaking Changes

-   `onFailureRedirection` is no longer allowed to return relative paths.
-   We now throw an error if `onFailureRedirection` returns the current URL or path when:
    -   redirecting away from the auth page (`websiteBasePath`, usually `/auth`) when a session already exists,
    -   redirecting after sign in/up,
    -   redirecting after successful email verification,
    -   redirecting after a successful MFA factor completion.

### Changes

-   We now redirect to the factor chooser screen if the MFA claim validator fails even if there is no available next factor. This will always show an access denied screen, which should help debugging.
-   `clearOnSubmit` now only clears the field value if the request returned an error. This is because the form navigates on success, making clearing the field unnecessary (which can lead to confusing UX if the navigation takes too long).
-   Fixed an issue where `SessionAuth` contents popped in before navigating away if a claim validator failed:
    -   Now we ony set the context if `onFailureRedirection` returned the current URL.
    -   Now we ony call the navigation function if `onFailureRedirection` returned something different than the current URL.
-   Made the `name` property optional in custom provider configs for usage with `usesDynamicLoginMethods`, where the tenant configuration is expected to set the name dynamically.
    -   Note, that not setting the name will make the UI crash if the `usesDynamicLoginMethods` is set to `false` or if the tenant configuration doesn't include a provider list.

## [0.39.1] - 2024-03-27

-   Fixes how we fetch the component to render based on the current path to take into account non auth recipes correctly.
-   Adds Remix example reference.

## [0.39.0] - 2024-03-07

### Overview

#### Introducing MFA

With this release, we are introducing MultiFactorAuth and TOTP, this will let you:

-   require (2FA or MFA) during sign in
-   make use of TOTP (e.g.: Google authenticator) as an MFA challenge

Check our [guide](https://supertokens.com/docs/mfa/introduction) for more information.

### Breaking changes

-   `SUCCESS` redirections are now handled by the `getRedirectionURL` callback passed to the `SuperTokens.init` config, instead of the recipe level callbacks
-   `isNewPrimaryUser` is renamed to `createdNewUser`
-   Refactored/renamed some styling options (`resetPasswordHeaderTitle` -> `headerTitle withBackButton`)
-   Some default styling has changed related to how fonts/font-weights are applied
-   Changed how `headerSubtitle` is styled in components: `EmailPasswordResetPasswordEmail`, `EmailPasswordSubmitNewPassword`, `EmailPasswordSignInHeader`, `EmailPasswordSignUpHeader`
-   Removed an `ErrorBoundary` wrapping all our feature components to make sure all errors are properly catchable by the app
-   In `supertokens-web-js` (which you may also be using), we added `firstFactors` into the return type of `getLoginMethods` and removed the enabled flags of different login methods.
    -   For older FDI versions, the firstFactors array will be calculated based on those enabled flags.
-   Renamed `validatorId` in claim validation errors to `id` to match the backend SDKs

#### Migration guide

##### Success redirections & isNewPrimaryUser rename

Before:

```tsx
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

SuperTokens.init({
    appInfo: {
        // appInfo
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",

            async getRedirectionURL(context) {
                if (context.action === "SUCCESS") {
                    if (context.isNewRecipeUser) {
                        // new primary user
                    } else {
                        // only a recipe user was created
                    }
                }
                return undefined;
            },
        }),
        Session.init(),
    ],
});
```

After:

```tsx
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

SuperTokens.init({
    appInfo: {
        // appInfo
    },
    async getRedirectionURL(context, userContext) {
        if (context.action === "SUCCESS" && context.newSessionCreated) {
            if (context.createdNewUser && context.recipeId === "passwordless") {
                // custom logic
            }
        }
        // Returning undefined means we use the default redirection
        return undefined;
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        Session.init(),
    ],
});
```

#### Styling changes

There are 2 types of style changes in this release:

1.  Refactored/renamed some styling options. If you didn't add custom styles for the following classes there is no action needed

    -   `resetPasswordHeaderTitle`: should now be styled using `withBackButton`
    -   `headerSubtitle`: now directly includes the text instead of a `div`, your styles may require an update to match this change

2.  Some default styling has changed related to how fonts/font-weights are applied. This may interact with your own font/sizing settings,
    if you didn't add font, font-size/weight and size changes to your custom styles, no action should be needed.

Both of the above changes could have subtle interactions with custom styles, so we recommend a quick manual (visual) test to make sure everything
still looks right.

#### getLoginMethods interface change in supertokens-web-js

If you used to use the enabled flags in getLoginMethods:

Before:

```ts
async function checkLoginMethods() {
    const loginMethods = await Multitenancy.getLoginMethods();
    if (loginMethods.thirdParty.enabled) {
        // custom logic
    }
    if (loginMethods.emailPassword.enabled) {
        // custom logic
    }
    if (loginMethods.passwordless.enabled) {
        // custom logic
    }
}
```

After:

```ts
async function checkLoginMethods() {
    const loginMethods = await Multitenancy.getLoginMethods();
    if (loginMethods.firstFactors.includes("thirdparty")) {
        // custom logic
    }
    if (loginMethods.firstFactors.includes("emailpassword")) {
        // custom logic
    }

    if (
        loginMethods.firstFactors.includes("otp-email") ||
        loginMethods.firstFactors.includes("otp-phone") ||
        loginMethods.firstFactors.includes("link-email") ||
        loginMethods.firstFactors.includes("link-phone")
    ) {
        // custom logic
    }
}
```

#### Event handler changes

Before:

```tsx
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

SuperTokens.init({
    appInfo: {
        // appInfo
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",

            onHandleEvent(context) {
                if (context.action === "SUCCESS") {
                    let user = context.user;
                    if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
                        // sign up success
                    } else {
                        // sign in success
                    }
                }
            },
        }),
        Session.init(),
    ],
});
```

After:

```tsx
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

SuperTokens.init({
    appInfo: {
        // appInfo
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",

            onHandleEvent(context) {
                if (context.action === "SUCCESS" && context.createdNewSession) {
                    let user = context.user;
                    let rid = context.rid;
                    if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
                        // sign up success
                    } else {
                        // sign in success
                    }
                }
            },
        }),
        Session.init(),
    ],
});
```

#### Renamed validatorId

If you used to use the `validatorId` prop of validationErrors, you should now use `id` instead.

Before:

```ts
async function checkValidators() {
    const validationErrors = await Session.validateClaims();
    for (const error of validationErrors) {
        console.log(error.validatorId, error.reason);
    }
}
```

After:

```ts
async function checkValidators() {
    const validationErrors = await Session.validateClaims();
    for (const error of validationErrors) {
        console.log(error.id, error.reason);
    }
}
```

### Changes

-   Added support for FDI 1.19 (Node SDK>= 17.0.0), but keeping support FDI version 1.17 and 1.18 (node >= 15.0.0, golang>=0.13, python>=0.15.0)
-   Added the `MultiFactorAuth` and `TOTP` recipes. To start using them you'll need compatible versions:
    -   Core>=8.0.0
    -   supertokens-node>=17.0.0
    -   supertokens-website>=18.0.0
    -   supertokens-web-js>=0.10.0
    -   supertokens-auth-react>=0.39.0
-   Added new MFA related components to Passwordless
    -   Added new prop `mfaFeature` to recipe config
        -   `disableDefaultUI`: can be used to disable paths: `${websiteBasePath}/mfa/otp-phone`, `${websiteBasePath}/mfa/otp-email`
        -   `style`: is applied on top of normal sign in/up styles on the MFA paths
    -   New embeddable components:
        -   `MfaOtpPhone` (by default handling path `${websiteBasePath}/mfa/otp-phone`)
        -   `MfaOtpEmail` (by default handling path `${websiteBasePath}/mfa/otp-email`)
    -   New overrideable components:
        -   `PasswordlessMFAHeader_Override`
        -   `PasswordlessMFAFooter_Override`
        -   `PasswordlessMFAOTPHeader_Override`
        -   `PasswordlessMFAOTPFooter_Override`
    -   Please note, that during MFA we re-use the existing overrideable comps for the form section:
        -   `PasswordlessEmailForm_Override`
        -   `PasswordlessPhoneForm_Override`
        -   `PasswordlessEmailOrPhoneForm_Override`
-   Added a `useShadowDom` prop to the `AccessDeniedScreen`
-   Added an `error` prop to the `AccessDeniedScreen` that can be used to describe the reason access is denied.
-   Added a `footer` prop to `EmailOrPhoneForm`, `EmailForm` and `PhoneForm` which is used to override the default sign in/up footers in case the component is for MFA
-   Sign in/up functions can now return new (MFA related) error codes.
-   New (MFA related) error codes have been added to the default translation files.
-   Updated how we select which login UI to show to take the `firstFactors` config value into account (defined in the `MultiFactorAuth` recipe or in the tenant information)
-   The passwordless and thirdpartypasswordless sign in/up screens now respect the firstFactors configuration (defined in the `MultiFactorAuth` recipe or in the tenant information) when selecting the available contact methods.
-   Added TOTP recipe. For more details please check our guide MFA guide.
-   Fixed a font loading issue, that caused apps using the default (Rubik) font to appear with the incorrect font weights
-   Added `rid` and `createdNewSession` to events with `action: "SUCCESS"`

## [0.38.0] - 2024-02-29

## Breaking Changes

-   Previously, when calling `redirectToAuth` with the `redirectBack` option, url fragments(hash) were stripped when redirecting back to the previous page after authentication. This issue has been fixed, and url fragments are preserved along with the query params. For users who employed the workaround of overriding the `windowHandler.location.getSearch` function to include fragments, it is essential to remove that override before upgrading to this version.

## [0.37.1] - 2024-02-26

-   Fixes types argument in override functions to make `builder` non optional.

## [0.37.0] - 2024-01-15

## Breaking Changes

-   The default `DateProvider` implementation relies on `localStorage`. If your environment lacks support for `localStorage`, you must provide custom implementations for either the `DateProvider` or `localStorage`.

### Changes

-   Exporting the `DateProvider` from supertokens-web-js, that both built-in and custom validators can use instead of `Date.now` to get an estimate of the server clock.
-   Added the `dateProvider` prop to the configuration that can be used to customize the built-in `DateProvider`.
-   Added `calculateClockSkewInMillis` as an overrideable function to the Session recipe that estimates the time difference between the backend and the client.

## [0.36.1] - 2023-12-20

### Fixes

-   Previously, when calling `redirectToAuth` with the `redirectBack` option, query parameters were stripped when redirecting back to the previous page after authentication. This issue has been fixed, and now query parameters are preserved as intended.

## [0.36.0] - 2023-12-07

### Changes

-   `getRedirectionURL` now supports returning `null` to prevent automatic redirection, useful for customizing the behavior after successful sign-in or sign-up. Typically, this is used if you want to embed the sign in / up component in a popup and want to just dismiss the popup post login.

Here's an example of how to use this:

```tsx
EmailPassword.init({
    getRedirectionURL: async (context, userContext) => {
        if (context.action === "SUCCESS") {
            return null;
        }
        // Returning undefined falls back to the default redirection strategy
        return undefined;
    },
});
```

-   `getRedirectionURL` now receives `userContext` as the second argument.

-   `isNewPrimaryUser` boolean property has been added to `GetRedirectionURLContext`. It can be used to check if a new primary user was created particularly in scenarios involving account linking.

-   `UserContext` type has been changed to `Record<string, unknown>` from `any`.

-   The `PreBuiltUI` components now accept a `navigate` prop, internally utilized by SuperTokens for redirection. This becomes handy when manually rendering the component and desiring client-side navigation instead of a full-page refresh for any redirection. Here's an example using `react-router-dom@v6`:

```tsx
import { SignInUp } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { useNavigate } from "react-router-dom";

function CustomSignInUp() {
    const navigate = useNavigate();
    return <SignInUp navigate={navigate} />;
}
```

### Breaking changes

-   `user` property has been removed from `GetRedirectionURLContext`.To get the `user` object from backend, you can follow hte instructions [here](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/get-user-info).

-   The `CloseTabScreen` [component](https://supertokens.com/img/otp-magic-link-same-time.png), previously featured in the passwordless recipe visible when a user signs in from another tab using a magic link, has been removed. Users will continue to see the 'Enter OTP' screen until they refresh. If you were [overriding](https://supertokens.com/docs/passwordless/advanced-customizations/react-component-override/usage) this component using `PasswordlessCloseTabScreen_Override`, you no longer need to do so.

-   If your workflow involves custom validation, such as Phone Number verification, after signing in, ensure your code aligns with the updated examples found in [with-phone-password](https://github.com/supertokens/supertokens-auth-react/tree/master/examples/with-phone-password) or [with-thirdpartyemailpassword-passwordless](https://github.com/supertokens/supertokens-auth-react/tree/master/examples/with-thirdpartyemailpassword-passwordless).

    Changes:

    -   The need to manually set `props.featureState.successInAnotherTab` to `false` to avoid displaying the `CloseTabScreen` component has been eliminated.

## [0.35.9] - 2023-12-06

-   Fixes ThirdPartyEmailPassword rendering sign in/up switcher even with disabled email password. Instead it'll now render `SignInAndUpHeader_Override` in this case (overrideable as `ThirdPartySignInAndUpHeader`). Overriding `ThirdPartyEmailPasswordHeader_Override` should still cover all cases.
-   Added a new prop to `ThirdPartyEmailPasswordHeader_Override` you can use to check if email password is enabled.

## [0.35.8] - 2023-11-26

-   Fixes `inputComponent` props to make them non optional. This is in the context of customizing the sign up form to add custom react components.

## [0.35.7] - 2023-11-24

### Added

-   EmailPassword and ThirdPartyEmailPassword recipe enhancements:
    -   Introduced the capability to utilize custom components by exposing `inputComponent` types.
    -   Allow setting default values in signup/signin form fields.
    -   Made the `onChange` prop in `inputComponent` simpler by removing the need for an `id` attribute.
    -   Added a feature to customize the "Field is not optional" error message for each form field with the `nonOptionalErrorMsg` prop.

Following is an example of how to use above features.

```tsx
EmailPassword.init({
    signInAndUpFeature: {
        signUpForm: {
            formFields: [
                {
                    id: "select-dropdown",
                    label: "Select Option",
                    getDefaultValue: () => "option 2",
                    nonOptionalErrorMsg: "Select dropdown is required",
                    inputComponent: ({ value, name, onChange }) => (
                        <select
                            value={value}
                            name={name}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Select Option">
                            <option value="" disabled hidden>
                                Select an option
                            </option>
                            <option value="option 1">Option 1</option>
                            <option value="option 2">Option 2</option>
                            <option value="option 3">Option 3</option>
                        </select>
                    ),
                },
            ],
        },
    },
});

ThirdPartyEmailPassword.init({
    signInAndUpFeature: {
        signUpForm: {
            formFields: [
                {
                    id: "terms",
                    label: "",
                    optional: false,
                    getDefaultValue: () => "true",
                    nonOptionalErrorMsg: "You must accept the terms and conditions",
                    inputComponent: ({ name, onChange, value }) => (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "left",
                            }}>
                            <input
                                value={value}
                                checked={value === "true"}
                                name={name}
                                type="checkbox"
                                onChange={(e) => onChange(e.target.checked.toString())}></input>
                            <span style={{ marginLeft: 5 }}>I agree to the terms and conditions</span>
                        </div>
                    ),
                },
            ],
        },
    },
});
```

## [0.35.6] - 2023-10-16

### Test changes

-   Updated test expectations to match fix in the node behaviour of the emailVerifyGET endpoint

## [0.35.5] - 2023-10-06

### Changes

-   Setting `autocomplete` in passwordless forms for email, phone and OTP

### Fixes

-   Fixed shadow dom issue in nextjs dev mode by checking if a shadow root is already attached to the div before creating one.

### Example changes

-   Updated dev/start script in netlify example

## [0.35.4] - 2023-09-28

### Fixes

-   fixed using `twitter` as id by default in twitter provider.

## [0.35.3] - 2023-09-26

### Added

-   Added new social provider `twitter`

-   Introduced a new option `logo` for thirdparty custom providers to set a custom logo, just like the `name` property.

Following is an example of how to use this new `logo` property.

```tsx
ThirdPartyPasswordless.init({
      signInUpFeature: {
        providers: [
          ThirdPartyPasswordless.Google.init(),
          ThirdPartyPasswordless.Apple.init(),
          {
            id: "discord",
            name: "Discord",
            logo: <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                      >
                        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                      </svg>,
...
```

## [0.35.2] - 2023-09-24

### Test changes

-   Split some test suites into multiple files to help with test parallelization

## [0.35.1] - 2023-09-21

### Test changes

-   Test fixes for backend SDK CI

## [0.35.0] - 2023-09-21

### Overview

#### Introducing account-linking

With this release, we are introducing AccountLinking, this will let you:

-   link accounts automatically,
-   implement manual account linking flows.

Check our [guide](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/account-linking/overview) for more information.

To use this you'll need compatible versions:

-   Core>=7.0.0
-   supertokens-node>=16.0.0 (support is pending in other backend SDKs)
-   supertokens-website>=17.0.3
-   supertokens-web-js>=0.8.0
-   supertokens-auth-react>=0.35.0

### Breaking changes

-   Added support for FDI 1.18 (Node SDK>= 16.0.0), but keeping support FDI version1.17 (node >= 15.0.0, golang>=0.13, python>=0.15.0)
-   User type has changed across recipes and functions: recipe specific user types have been removed and replaced by a generic one that contains more information
-   `createdNewUser` has been renamed to `createdNewRecipeUser`
-   `createCode`, `consumeCode`, `createPasswordlessCode` and `consumePasswordlessCode` can now return status: `SIGN_IN_UP_NOT_ALLOWED`
-   `signInAndUp` and `thirdPartySignInAndUp` can now return new status: `SIGN_IN_UP_NOT_ALLOWED`
-   `sendPasswordResetEmail` can now return `status: "PASSWORD_RESET_NOT_ALLOWED"`
-   `signIn` and `emailPasswordSignIn` can now return `SIGN_IN_NOT_ALLOWED`
-   `signUp` and `emailPasswordSignUp` can now return `SIGN_UP_NOT_ALLOWED`
-   The context param of `getRedirectionURL` gets an optional `user` prop (it's always defined if `createdNewRecipeUser` is set to true)
-   Added new language translation keys
-   We've added error messages for all of the above error statuses. Please see the new UI [here](https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/account-linking/automatic-account-linking#support-status-codes). You can change the text using the language translation feature

### Migration

#### New User structure

We've added a generic `User` type instead of the old recipe specific ones. The mapping of old props to new in case you are not using account-linking:

-   `user.id` stays `user.id`
-   `user.email` becomes `user.emails[0]`
-   `user.phoneNumber` becomes `user.phoneNumbers[0]`
-   `user.thirdParty` becomes `user.thirdParty[0]`
-   `user.timeJoined` is still `user.timeJoined`
-   `user.tenantIds` is still `user.tenantIds`

#### Checking if a user signed up or signed in

-   When calling passwordless consumeCode / social login signinup APIs, you can check if a user signed up by:

```
    // Here res refers to the result the function/api functions mentioned above.
    const isNewUser = res.createdNewRecipeUser && res.user.loginMethods.length === 1;
```

-   When calling the emailpassword sign up API, you can check if a user signed up by:

```
    const isNewUser = res.user.loginMethods.length === 1;
```

-   In `getRedirectionURL`

```
EmailPassword.init({ // This looks the same for other recipes
    // Other config options.
    async getRedirectionURL(context) {
        if (context.action === "SUCCESS") {
            if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
                // new primary user
            } else {
                // only a recipe user was created
            }
        }
        return undefined;
    }
})
```

-   In `onHandleEvent`:

```
EmailPassword.init({ // This looks the same for other recipes
    // Other config options.
    onHandleEvent(context: EmailPasswordOnHandleEventContext) {
        if (context.action === "SUCCESS") {
            if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
                // new primary user
            } else {
                // only a recipe user was created
            }
        }
    },
})
```

## [0.34.2] - 2023-08-27

### Fixes

-   Fixed the SDK trying to merge the providers from the tenant config if the third party login method is disabled.

## [0.34.1] - 2023-07-31

### Changes

-   Delaying the initial `getDynamicLoginMethods` until the first feature/routing component renders
-   Added a spinner that shows up if `usesDynamicLoginMethods` is true and `getDynamicLoginMethods` takes longer than 200ms
-   Updated with-one-login-many-subdomains example to match the create-supertokens-app-example

## [0.34.0] - 2023-07-18

### Changes

-   Added a new optional parameter to `getSuperTokensRoutesForReactRouterDom` to support embedded routes
-   Added Active Directory, Okta, Linked In, Boxy SAML, Google Workspaces providers
-   Added name prop to buttonComponent
-   Added thirdparty login with popup window
-   Added Multitenancy recipe
-   Improved typing of `getClaimValue`
-   Optional `clientType` config in the input for `SuperTokens.init` function, that is used by thirdparty and multitenancy recipes.
-   Optional `usesDynamicLoginMethods` config in the input for `SuperTokens.init` function, which makes the SDK check the backend to see which recipes should be enabled
-   Added an overrideable `getTenantIdFromURL` to multiple recipes

### Breaking Changes

-   Only supporting FDI 1.17
-   Backend SDKs have to be updated first to a version that supports multi-tenancy for thirdparty
    -   supertokens-node: >= 15.0.0
    -   supertokens-golang: >= 0.13.0
    -   supertokens-python: >= 0.15.0
-   In ThirdParty recipe,

    -   Changed signatures of the functions `getAuthorisationURLWithQueryParamsAndSetState`

        ```diff
         import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-auth-react/recipe/thirdparty';

         getAuthorisationURLWithQueryParamsAndSetState({
        -  providerId: "google",
        +  thirdPartyId: "google",
        -  authorisationURL: "http://localhost/auth/callback/google",
        +  frontendRedirectURI: "http://localhost/auth/callback/google",
         });
        ```

    -   Removed functions - `setStateAndOtherInfoToStorage`, `getAuthorisationURLFromBackend`, `generateStateToSendToOAuthProvider`, `verifyAndGetStateOrThrowError`, `getAuthCodeFromURL`, `getAuthErrorFromURL`, `getAuthStateFromURL`

-   In ThirdPartyEmailpassword recipe,

    -   Changed signatures of the functions `getAuthorisationURLWithQueryParamsAndSetState`

        ```diff
         import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

         getAuthorisationURLWithQueryParamsAndSetState({
        -  providerId: "google",
        +  thirdPartyId: "google",
        -  authorisationURL: "http://localhost/auth/callback/google",
        +  frontendRedirectURI: "http://localhost/auth/callback/google",
         });
        ```

    -   Removed functions - `setStateAndOtherInfoToStorage`, `getAuthorisationURLFromBackend`, `generateStateToSendToOAuthProvider`, `verifyAndGetStateOrThrowError`, `getAuthCodeFromURL`, `getAuthErrorFromURL`, `getAuthStateFromURL`

-   In ThirdPartyPasswordless recipe,

    -   Changed signatures of the functions `getThirdPartyAuthorisationURLWithQueryParamsAndSetState`

        ```diff
         import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-auth-react/recipe/thirdpartypasswordless';

         getAuthorisationURLWithQueryParamsAndSetState({
        -  providerId: "google",
        +  thirdPartyId: "google",
        -  authorisationURL: "http://localhost/auth/callback/google",
        +  frontendRedirectURI: "http://localhost/auth/callback/google",
         });
        ```

    -   Removed functions - `setThirdPartyStateAndOtherInfoToStorage`, `getAuthorisationURLFromBackend`, `generateThirdPartyStateToSendToOAuthProvider`, `verifyAndGetThirdPartyStateOrThrowError`, `getThirdPartyAuthCodeFromURL`, `getThirdPartyAuthErrorFromURL`, `getThirdPartyAuthStateFromURL`

## [0.33.1] - 2023-06-08

### Fixes

-   CSS change to fix the responsiveness of the default `AccessDenied` screen

## [0.33.0] - 2023-06-06

### Added

-   Introduce `onFailureRedirection` and `showAccessDeniedOnFailure` on claims and validators to make handling session claim validation failures easier
-   Added an `accessDeniedScreen` prop to `SessionAuth`. The component passed as this prop is rendered if a claim validator (with `showAccessDeniedOnFailure` set to true) fails.
-   Added a styleable `AccessDeniedScreen` to provide a useful default for the above `accessDeniedScreen` prop.
-   Update to web-js interface version
-   Updated supertokens-web-js dependency, which made SessionClaimValidator a type instead of an abstract class
-   Added `textGray` to the palette variables (used in the default access denied screen)
-   Now the email verification feature component will never render `SendVerifyEmail` without a session

## [0.32.4] - 2023-05-31

-   Fixed the types for EmailVerification.init to not require a config to be passed.

## [0.32.3] - 2023-05-10

-   Changed email verification index.tsx to use index.ts instead so that auto generated docs add it.

## [0.32.2] - 2023-05-10

-   Fixed with-thirdpartyemailpassword-passwordless apps overwritten button's width
-   Fixed supertokens-auth-react/ui import referencing .js file instead of .d.ts causing ts issue

## [0.32.1] - 2023-05-03

### Changes

-   Made Session.validateClaims argument optional

## [0.32.0] - 2023-05-02

### Changes

-   Eliminated the need for duplicate `init` call for non-react applications that use pre-built UI. [See the issue](https://github.com/supertokens/supertokens-auth-react/issues/616)
-   Split/separate pre-built UI components from its recipe to reduce bundle sizes for apps that do not use pre-built UI
-   Added thirdparty login with popup window example

### Migration

#### Initializing web-js

This version also initializes the web-js SDK. If you previously did that manually, you can remove/replace it with the auth-react init call.
From this version forward, the recommended way to use this SDK, even with Angular and Vue, is to initialize auth-react in the root component. Importing `supertokens-auth-react` will not pull React into your main bundle; only importing the `prebuiltui` modules will.
For more details, check out our quick setup guides for angular and vue.

#### Adding the pre-built UI route for apps with react-router-dom

```tsx
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
// .... other imports

SuperTokens.init({
    appInfo: {
        // appInfo
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        Session.init(),
    ],
});

<SuperTokensWrapper>
    <div className="App">
        <Router>
            <div className="fill">
                <Routes>
                    {/* This shows the login UI on "/auth" route */}
                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                    // ... other routes
                </Routes>
            </div>
            <Footer />
        </Router>
    </div>
</SuperTokensWrapper>;
```

Should become

```tsx
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
// .... other imports

SuperTokens.init({
    appInfo: {
        // appInfo
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        Session.init(),
    ],
});

<SuperTokensWrapper>
    <div className="App">
        <Router>
            <div className="fill">
                <Routes>
                    {/* This shows the login UI on "/auth" route for Passwordless recipe */}
                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [PasswordlessPreBuiltUI])}
                    // ... other routes
                </Routes>
            </div>
            <Footer />
        </Router>
    </div>
</SuperTokensWrapper>;
```

#### Adding the pre-built UI route for apps without react-router-dom

```tsx
import React from "react";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";

class App extends React.Component {
    render() {
        if (SuperTokens.canHandleRoute()) {
            // This renders the login UI on the /auth route
            return SuperTokens.getRoutingComponent();
        }

        return <SuperTokensWrapper>{/*Your app*/}</SuperTokensWrapper>;
    }
}
```

Should become

```tsx
import { SuperTokensWrapper } from "supertokens-auth-react";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";

class App extends React.Component {
    render() {
        if (canHandleRoute([PasswordlessPreBuiltUI])) {
            // This renders the login UI on the /auth route
            return getRoutingComponent([PasswordlessPreBuiltUI]);
        }

        return <SuperTokensWrapper>{/*Your app*/}</SuperTokensWrapper>;
    }
}
```

## [0.31.5] - 2023-03-30

### Changes

-   Added new social providers(Gitlab, Discord, Bitbucket)

## [0.31.4] - 2023-03-29

### Changes

-   Switched dependency away from the removed/unpublished `mocha-split-tests` package

## [0.31.3] - 2023-03-23

### Changes

-   Fix unsupported engine warning for npm v9
-   Updates dependency versions for `supertokens-auth-react` and `supertokens-node` for all example apps
-   Initialises the Dashboard recipe for all example apps

## [0.31.2] - 2023-03-07

### Fixes

-   Keep redirectToPath's query params while redirecting to it from auth

### Changes

-   Update example apps after header based auth

## [0.31.1] - 2023-02-12

### Changes

-   Add ordering for imports
-   Force consistent type imports

### Fixes

-   Fixed all buttons to have pointer cursor on hover.
-   Fixed component override propagation into sub-recipe only feature components (i.e., ThirdPartySignInAndUpCallbackTheme_Override in thirdpartyemailpassword)

## [0.31.0] - 2023-02-01

## Breaking changes

-   Updated `supertokens-web-js` dependency that requires a backend SDK update to:
    -   supertokens-node: >= 13.0.0
    -   supertokens-python: >= 0.12.0
    -   supertokens-golang: >= 0.10.0
-   Renamed configuration options:
    -   `sessionScope` renamed to `sessionTokenFrontendDomain`
    -   `cookieDomain` renamed to `sessionTokenBackendDomain`

### Added

-   Added support for authorizing requests using the `Authorization` header instead of cookies
    -   Added `tokenTransferMethod` config option
    -   Check out https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/sessions/token-transfer-method for more information

## [0.30.2] - 2023-01-21

### Changes

-   Prefilling the phone number input with the dial code if default country is set.

## [0.30.1] - 2023-01-20

### Bugfixes

-   Fixed guessing internation phone number in passwordless with EMAIL_OR_PHONE contact method if the number starts with a valid country dial code

## [0.30.0] - 2023-01-20

### Changes

-   Updated many dependencies to fix warnings during install
-   Updated our build process to use rollup as a bundler

### Breaking changes

-   Removed dependency on emotion/chroma
-   Updated to styling through plain CSS instead of objects/emotion. Check https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/styling/changing-style for more info
-   Removed palette option, colors are now customizable through setting CSS variables in styles. Check https://supertokens.com/docs/thirdpartyemailpassword/common-customizations/styling/changing-colours for more info
-   Moved `supertokens-web-js` into `devDependencies`. If using npm version 6, you also need to install it with `npm i --save supertokens-web-js`. Later versions install it automatically.
-   The default phone number input changed in passwordless and thirdpartypasswordless recipe (switched to using `intl-tel-input`)

### Migration

#### Custom styles

Before:

```tsx
SuperTokens.init({
    appInfo: {
        apiDomain: "...",
        appName: "...",
        websiteDomain: "...",
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            style: {
                container: {
                    fontFamily: "cursive",
                },
            },
        }),
        Session.init(),
    ],
});
```

After:

```tsx
SuperTokens.init({
    appInfo: {
        apiDomain: "...",
        appName: "...",
        websiteDomain: "...",
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            style: `
                [data-supertokens~=container] {
                    font-family: cursive;
                }
            `,
        }),
        Session.init(),
    ],
});
```

#### Custom palette

Before:

```tsx
SuperTokens.init({
    appInfo: {
        apiDomain: "...",
        appName: "...",
        websiteDomain: "...",
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            palette: {
                background: "#333",
                inputBackground: "#292929",
                textTitle: "white",
                textLabel: "white",
                textPrimary: "white",
                error: "#ad2e2e",
                textInput: "#a9a9a9",
                textLink: "#a9a9a9",
            },
        }),
        Session.init(),
    ],
});
```

After:

```tsx
SuperTokens.init({
    appInfo: {
        apiDomain: "...",
        appName: "...",
        websiteDomain: "...",
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            style: `
                [data-supertokens~=container] {
                    --palette-background: 51, 51, 51;
                    --palette-inputBackground: 41, 41, 41;
                    --palette-inputBorder: 41, 41, 41;
                    --palette-textTitle: 255, 255, 255;
                    --palette-textLabel: 255, 255, 255;
                    --palette-textPrimary: 255, 255, 255;
                    --palette-error: 173, 46, 46;
                    --palette-textInput: 169, 169, 169;
                    --palette-textLink: 169, 169, 169;
                }
            `,
        }),
        Session.init(),
    ],
});
```

## [0.29.0] - 2023-01-06

### Breaking changes

-   Moved component override config into a recipe specific provider component

### Migration

```tsx
SuperTokens.init({
    recipeList: [
        EmailPassword.init({
            override: {
                components: {
                    EmailPasswordSignIn_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <img src="octocat.jpg" />
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        }),
    ],
});
```

Components override would move to override provider component's prop:

```tsx
import EmailPassword, { EmailPasswordComponentsOverrideProvider } from "supertokens-auth-react/recipe/emailpassword";

SuperTokens.init({
    recipeList: [EmailPassword.init()],
});

function App() {
    return (
        <SuperTokensWrapper>
            <EmailPasswordComponentsOverrideProvider
                components={{
                    EmailPasswordSignIn_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <img src="octocat.jpg" />
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                }}>
                {/* The rest of JSX */}
            </EmailPasswordComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
```

### Testing

-   Created test for the sign up attempt using duplicate email

## [0.28.1] - 2022-12-13

### Fixes

-   Trailing slash is added to URL when going back to "Sign In" from "Forgot Password" for consistency (fixes https://github.com/supertokens/supertokens-auth-react/issues/625)

## [0.28.0] - 2022-12-13

### Breaking change

-   Changed styles for social login buttons

## [0.27.4] - 2022-12-06

### Testing

-   Updated test to match new behaviour of the website SDK - not rethrowing refresh errors during `doesSessionExist`

## [0.27.3] - 2022-11-25

### Adds

-   `getClaimValue` function inside Session recipe - exposed because web-js exposes it too.

## [0.27.2] - 2022-11-18

### Fixes

-   Makes input userContext optional in `validateClaims` function in Session recipe

## [0.27.1] - 2022-10-25

### Changed

-   Updated passwordless login to first try calling the API if it could guess a valid international phone number

### Fixes

-   Cleaned up some warnings shown in the console
-   Fixes an issue where pre api hooks would not work correctly when calling recipe functions directly

## [0.27.0] - 2022-10-18

### Added

-   Adding an interceptor for XMLHttpRequest by default upon initializing SuperTokens
-   Marked `addAxiosInterceptors` as deprecated
-   Request interception can now be disabled by adding `superTokensDoNotDoInterception` to the hash of the request (works as a queryparam as well)

## [0.26.6] - 2022-10-13

### Added

-   Made the header of the third party sign in/up form overrideable

## [0.26.5] - 2022-10-11

### Fixes

-   Fixed the error message shown if a network error occured while consuming a link in passwordless
-   Now clearing the OTP input field in passwordless after submit (as it was intended)

## [0.26.4] - 2022-09-29

### Fixes

-   Fixed a case where SessionAuth could get stuck in an infinite loop
-   Fixed some css related error logs appearing in console

## [0.26.3] - 2022-09-22

### Build/Test changes

-   Fixes how our CI testing procedure (alway using latest)

## [0.26.2] - 2022-09-22

-   Fixes parameter type for Passwordless `consumeCode`

## [0.26.1] - 2022-09-22

### Changes

-   Adds `redirectToAuth` to props of the overrideable `SendVerifyEmail` component

### Fixes

-   Redirecting to auth when opening the default UI on `/auth/verify-email` with an unknown/deleted user instead of showing an empty screen
-   In case an error is thrown during loading session information/claim validation, `sessionContext` will now contain `doesSessionExist: false` instead of throwing an error

## [0.26.0] - 2022-09-14

### Added

-   Adds Session claims support and `UserRoleClaim`, `PermissionClaim` and `EmailVerificationClaim`
-   Added `overrideGlobalClaimValidators` and `doRedirection` to `SessionAuth` props
-   Added `validateClaims`, `useClaimValue` and `getInvalidClaimsFromResponse` to the `Session` recipe
-   Added `API_INVALID_CLAIM` event to the `Session` recipe
-   Export for `EmailVerification` recipe
-   Added "OPTIONAL" mode for the `EmailVerification` recipe

### Fixes

-   Fixed typing of `onSuccess` prop on passwordless `SignInUpProps`
-   Fixed some full-page redirect that happened even when using react-router-dom
-   Fixed rare error in an edge case where `getSuperTokensRoutesForReactRouterDom` was used by a sub-component of `SessionAuth`

### Breaking changes

-   Only supporting FDI 1.15
-   Backend SDKs have to be updated first to a version that supports session claims before enabling EmailVerification!
    -   supertokens-node: >= 12.0
    -   supertokens-golang: >= 0.9
    -   supertokens-python: >= 0.11
-   EmailVerification recipe is now not initialized as part of auth recipes. You can add it to the recipe list as `EmailVerification.init` like other recipes.
-   Removed `OFF` from possible `EmailVerification` recipe modes, default is updated to `REQUIRED`.
-   Moved email verification related styling options, events, overrides, pre-api hooks and redirection contexts into the `EmailVerification` recipe. You should configure them while initializing the `EmailVerification` recipe.
-   Removed recipe specific auth wrapper components. You should use `SessionAuth` instead.
-   Removed email verification methods from auth recipes. You should now call them on the `EmailVerification` recipe directly.
-   `requireAuth` now defaults to true in `SessionAuth` to match the behavior of the removed recipe specific wrappers.
-   Removed `redirectToLogin` from `SessionAuth`.
-   Moved `redirectToAuth` to SuperTokens out of auth recipes. You should now call `SuperTokens.redirectToAuth()` instead. In this function `redirectBack` defaults to `true`.
-   Removed `SIGN_IN_AND_UP` action from `GetRedirectionURLContext` of auth recipes. This should now be handled by passing a `getRedirectionURL` to `SuperTokens.init` that handles a context with the `TO_AUTH` action.

### Migration

#### EmailVerification recipe init

```ts
SuperTokens.init({
    // Normal init conf...
    recipeList: [
        EmailPassword.init({
            getRedirectionURL: (context) => {
                if (context.action === "SIGN_IN_AND_UP") {
                    // This handler should be moved to the SuperTokens.init level
                    return "/auth";
                }
                // All email verification related context should be now handled in the config of the EmailVerification recipe
            },
            onHandleEvent: () => {
                // Handle email verification related events here in the onHandleEvent of the EmailVerification config
            },
            preAPIHook: (context) => {
                // Move email verification related pre-API hooks into the preAPIHook of the EmailVerification config
            },
            postAPIHook: (context) => {
                // Move email verification related post-API hooks into the postAPIHook of the EmailVerification config
            }
            emailVerificationFeature: {
                mode: "REQUIRED",
                // Any other props here should be moved into the config of the EmailVerification recipe
            },
            override: {
                emailVerificationFeature: {
                    // These overrides should be moved into the config of the EmailVerification recipe
                }
            }
        }),
    ]
})
```

Should become:

```ts
SuperTokens.init({
    // Normal init conf...
    getRedirectionURL: (context) => {
        if (context.action === "TO_AUTH") {
            // Move handling the SIGN_IN_AND_UP action here
            return "/auth";
        }
    },
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",
            // Props from emailVerificationFeature of the EmailPassword.init config should be moved here.
            override: {
                // The overrides from emailVerificationFeature in the overrides of the EmailPassword config should be moved here
            },

            getRedirectionURL: (context) => {
                // Move handling email verification related redirects here
            },
            onHandleEvent: () => {
                // Handle email verification related events here
            },
            preAPIHook: (context) => {
                // Move email verification related pre-API hooks here
            },
            postAPIHook: (context) => {
                // Move email verification related post-API hooks here
            },
        }),
        EmailPassword.init({}),
    ],
});
```

#### Auth wrappers

```tsx
function ProtectedHomeComponent() {
    return (
        <EmailPasswordAuth>
            <Home />
        </EmailPasswordAuth>
    );
}
```

Should become:

```tsx
function ProtectedHomeComponent() {
    return (
        <SessionAuth>
            <Home />
        </SessionAuth>
    );
}
```

## [0.25.1] - 2022-09-18

### Bug fixes

-   We now ignore errors thrown while sending verification emails on mount as intended
-   Calls the trim function for email and phone number validation in passwordless and emailpassword based recipes.

## [0.25.0]

### Additions

-   Added `getRedirectURL` configuration option to third-party providers. This can be used to set where the user is redirected back during the callback.

### Breaking changes

-   SuperTokens components can now throw in case the server goes down. We advise adding an ErrorBoundary to provide a meaningful error screen. Please check here: https://reactjs.org/docs/error-boundaries.html

## [0.24.8] - 2022-09-02

### Bug fixes

-   Input colors now follow `inputBackground` and `textInput` even while being pre-filled

### Changes

-   Updates `supertokens-node` version in example apps

## [0.24.7] - 2022-08-23

### Changes

-   Makes the input argument for `consumePasswordlessCode` in ThirdPartyPasswordless optional.

## [0.24.6] - 2022-08-17

### Bug fixes

-   Fixed clearing errors when switching between sign in & up in thirdpartyemailpassword

## [0.24.5] - 2022-08-16

### Changed

-   Sign in/up components now take a `redirectOnSessionExists` prop that controls if it redirects away if a session exists on mount. Defaults to true.
-   Adds unit tests to make sure that recipe functions are exported correctly

## [0.24.4] - 2022-08-07

-   Fixes styling issue for login with github

## [0.24.3] - 2022-08-05

### Changed

-   Updated `react-scripts` in all examples
-   Updated READMEs for example apps, removed information that is no longer relevant.

### Fixed

-   Fixed capitalization of GitHub on the UI (fixes https://github.com/supertokens/supertokens-auth-react/issues/539)

## [0.24.2] - 2022-07-28

-   Fixes prop passing when custom theme is used with the feature components
-   Updates supabase example app to use supertokens-auth-react version 0.24
-   Updates grammar for "Something went wrong" error text.

## [0.24.1] - 2022-07-12

### Added

-   Additional tests for `getRedirectionURL`

### Changed

-   Update `supertokens-web-js` dependency version

### Fixed

-   Fixes https://github.com/supertokens/supertokens-auth-react/issues/523

## [0.24.0] - 2022-07-06

### Bug fixes

-   Fixes an issue where `userContext` would not get passed correctly for `ThirdPartyPasswordless` recipe

### Added

-   Added `SuperTokensWrapper` intended to wrap around whole applications, providing a session context

### Changed

-   Made auth wrappers SSR compatible

### Breaking changes

-   Added `loading` to the session context. Please check if the session context is still loading before using other props. `loading` is always false inside components wrapped by `AuthWrapper`s with `requireAuth=true`

### Migration

Following is an example of how your components may have to change. If you had components like this:

```tsx
// .... other imports
import SuperTokens, { getSuperTokensRoutesForReactRouterDom, SuperTokensWrapper } from "supertokens-auth-react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { ThirdPartyEmailPasswordAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

function Component() {
    const sessionContext = useSessionContext();

    return <div className="fill">{sessionContext.doesSessionExist ? "logged in" : "logged out"}</div>;
}

SuperTokens.init({
    /* config... */
});

function App() {
    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Routes>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route
                            path="/some-path"
                            element={
                                <ThirdPartyEmailPasswordAuth requireAuth={true}>
                                    {/*
                                        In this case, Component will always display logged in.
                                        If doesSessionExist is false after the session is loaded, the user is redirected to the login screen
                                    */}
                                    <Component />
                                </ThirdPartyEmailPasswordAuth>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <ThirdPartyEmailPasswordAuth requireAuth={false}>
                                    <Component />
                                </ThirdPartyEmailPasswordAuth>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
```

It'd look like this after the update:

```tsx
// .... other imports
import SuperTokens, { getSuperTokensRoutesForReactRouterDom, SuperTokensWrapper } from "supertokens-auth-react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { ThirdPartyEmailPasswordAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

function Component() {
    const sessionContext = useSessionContext();

    if (sessionContext.loading === true) {
        // You could display a loading screen here, but session context loading is very fast
        // so returning null is better in most cases to avoid content popping in and out
        return null;
    }

    return <div className="fill">{sessionContext.doesSessionExist ? "logged in" : "logged out"}</div>;
}

SuperTokens.init({
    /* config is unchanged */
});

function App() {
    return (
        <div className="App">
            <SuperTokensWrapper>
                <Router>
                    <div className="fill">
                        <Routes>
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                            <Route
                                path="/some-path"
                                element={
                                    <ThirdPartyEmailPasswordAuth requireAuth={true}>
                                        {/* 
                                            In this case, Component will never hit the loading === true branch.
                                            It will only be rendered if `loading === false && doesSessionExist === true`
                                            If doesSessionExist is false after the session is loaded, the user is redirected to the login screen
                                        */}
                                        <Component />
                                    </ThirdPartyEmailPasswordAuth>
                                }
                            />
                            <Route path="/" element={<Component />} />
                        </Routes>
                    </div>
                </Router>
            </SuperTokensWrapper>
        </div>
    );
}
```

## [0.23.2] - 2022-06-27

### Adds

-   Adds an example app with Vue + React

### Changes

-   Updates to supertokens-web-js version to reflect interface change in `cookieHandler`
-   Updates angular example app to use `supertokens-web-js`

### Fixes

-   Fixed dropdown interactivity of the country dropdown of the phone number input
-   Added memoization to reduce unnecessary rerenders of phone number input sub-components
-   Disabled smart-caret to fix a caret positioning bug on android phones in phone number input

## [0.23.1] - 2022-06-25

-   [CI]: Changes dependency for node SDK in integration tests so that tests pass when using node 14

## [0.23.0] - 2022-06-24

### Changed

-   Showing a confirmation button before consuming a passwordless link if there is no stored login attempt info or if it doesn't match the link
-   Showing a confirmation button before consuming an email verification token if there is no active session to prevent mail scanners validating the email address
-   Adds an example app with Email Verification with OTP
-   Changes in the Reset Password Email Sent success screen in `emailpassword` and `thirdpartyemailpassword` recipes
    -   Updated text of the success message displayed
    -   Updated text of the 'Resend' button which redirects user back to Reset Password form
-   Update supertokens-web-js dependency version
-   Added new tests for checking general error handling
-   Refactors example apps to not import from build directories
-   fixes to angular example app
-   Not importing helpers from `tslib`

### Added

-   The reset password form has a back button which takes the user back to the 'Sign in' form in `emailpassword` and `thirdpartyemailpassword` recipes.
-   Back button in the reset password email sent success screen that redirects user to the 'Sign In' form in `emailpassword` and `thirdpartyemailpassword` recipe.
-   Support for FDI 1.14

### Added

-   The reset password form has a back button which takes the user back to the 'Sign in' form in `emailpassword` and `thirdpartyemailpassword` recipes.

### Breaking changes

-   Removes `setCookieSync` and `getCookieSync` from the interface for `cookieHandler` when calling `SuperTokens.init`

## [0.22.4] - 2022-06-20

### Added

-   Exposes more functions from each recipe.
-   Updates the dependency version of supertokens-auth-react for example apps

## [0.22.3] - 2022-06-14

### Build changes

-   Updated typescript to latest
-   Using tsconfig to set jsx import source instead of pragma comments
-   Updated react-shadow

## [0.22.2] - 2022-06-11

### Changes

-   Clearing errors when switching between sign-in and up

### Build changes

-   Updated typescript to latest
-   Using tsconfig to set jsx import source instead of pragma comments
-   Updated react-shadow

## [0.22.1] - 2022-06-11

-   Updates the example app for ThirdPartyEmailPassword + Passwordless login with SuperTokens
-   Adds new tests for testing resend code button in passwordless recipe

### CI changes

-   Only running React 16 tests on CircleCI (when an explicit envvar is set)

## [0.22.0] - 2022-06-03

-   Adds a SuperTokens + Supabase example app
-   Adds an example app with svelte
-   Adds phone number and password demo app
-   Adds an example app with Angular + React

### CI changes

-   Now using parallel builds
-   Screenshotting failed tests
-   Exporting test results

### Changed

-   The return type of `user` in the following functions to include information returned by the third party provider
    -   `signInAndUp` function for ThirdParty recipe
    -   `thirdPartySignInAndUp` function for the ThirdPartyEmailPassword recipe
    -   `thirdPartySignInAndUp` function for the ThirdPartyPasswordless recipe

### Added

-   All recipe functions now accept an additional parameter `userContext`, learn more about this by visiting the advanced cusotmisations section in the documentation
-   All UI components exported by the SDK now accept an additional `userContext` prop, learn more about this by visiting the advanced cusotmisations section in the documentation
-   Exports more recipe functions for emailverification recipe to allow them to be called without using the pre-built UI. Newly exported functions: `verifyEmail`, `sendVerificationEmail`
-   Exports all emailverification recipe functions from emailpassword, thirdparty, thirdpartyemailpassword and thirdpartypasswordless recipes.
-   Exports more recipe functions for emailpassword recipe to allow them to be called without using the pre-built UI. Newly exported functions: `submitNewPassword`, `sendPasswordResetEmail`, `signUp`, `signIn`, `doesEmailExist`.
-   Exports more recipe functions for thirdparty recipe to allow them to be called without using the pre-built UI. Newly exported functions: `getAuthorisationURLWithQueryParamsAndSetState`, `signInAndUp`.
-   Exports emailpassword and thidparty recipe functions from thirdpartyemailpassword recipe to allow them to be called without using the pre-built UI. Also exports `redirectToThirdPartyLogin` from thirdpartyemailpassword recipe.
-   Exports more recipe functions for passwordless recipe to allow them to be called without using the pre-built UI. Newly exported functions: `createCode`, `resendCode`, `consumeCode`, `doesEmailExist`, `doesPhoneNumberExist`
-   Exports more recipe functions for thirdpartypasswordless recipe to allow them to be called without using the pre-built UI. Newly exported functions: `redirectToThirdPartyLogin`, `thirdPartySignInAndUp`, `createCode`, `resendCode`, `consumeCode`, `doesPasswordlessUserEmailExist`, `doesPasswordlessUserPhoneNumberExist`
-   Changes recipe functions for email verification recipe **(this is breaking change if you use the override feature)**:
    -   `verifyEmail` -> No longer accepts `token` as a parameter, instead it calls `getEmailVerificationTokenFromURL`
    -   `getEmailVerificationTokenFromURL` -> NEW FUNCTION
-   Changes recipe functions for email password recipe **(this is breaking change if you use the override feature)**:
    -   `submitNewPassword` -> No longer accepts `token` as a parameter, instead calls `getResetPasswordTokenFromURL`
    -   `getResetPasswordTokenFromURL` -> NEW FUNCTION
-   Changes recipe functions for third party recipe (this is breaking change if you use the override feature):
    -   `getOAuthState` -> RENAMED TO `getStateAndOtherInfoFromStorage`
    -   `setOAuthState` -> RENAMED TO `setStateAndOtherInfoToStorage`
    -   `getOAuthAuthorisationURL` -> RENAMED TO `getAuthorisationURLFromBackend`
    -   `getAuthorisationURLWithQueryParamsAndSetState` -> NEW FUNCTION
    -   `generateStateToSendToOAuthProvider` -> NEW FUNCTION
    -   `verifyAndGetStateOrThrowError` -> NEW FUNCTION
    -   `getAuthCodeFromURL` -> NEW FUNCTION
    -   `getAuthErrorFromURL` -> NEW FUNCTION
    -   `getAuthStateFromURL` -> NEW FUNCTION
    -   `redirectToThirdPartyLogin` -> REMOVED (use `getAuthorisationURLWithQueryParamsAndSetState` instead). NOTE: If you call this function yourself the SDK will no longer auto-redirect, you will need to redirect to the result url manually.
-   Changes recipe funtions for third party email password recipe **(this is breaking change if you use the override feature)**:
    -   Changes for email password functions explained above
    -   Changes for third party functions explained above
    -   `signInAndUp` -> REMOVED, this function has been split into 3 new functions for simplicity (explained below)
    -   `emailPasswordSignUp` -> NEW FUNCTION
    -   `emailPasswordSignIn` -> NEW FUNCTION
    -   `thirdPartySignInAndUp` -> NEW FUNCTION
-   Changes recipe functions for passwordless recipe **(this is breaking change if you use the override feature)**:
    -   `getLinkCodeFromURL` -> NEW FUNCTION
    -   `getPreAuthSessionIdFromURL` -> NEW FUNCTION
-   Changes recipe functions for thirdpartpasswordless recipe : **(this is breaking change if you use the override feature)**:
    -   Changes for third party functions explained above
    -   Changes for passwordless recipe explained above
    -   `clearLoginAttemptInfo` -> RENAMED TO `clearPasswordlessLoginAttemptInfo`
-   Session recipe now uses supertokens-web-js internally (previously used supertokens-website)
-   All recipes now include a `postAPIHook` configuration parameter that can be used to respond to network actions.
-   General error handling for email verification components

### Breaking changes

1.  Updates function return types for all recipes to allow for custom API response handling when calling recipe functions manually
2.  All recipe functions now return an object which contains a `status` field along with other properties (instead of returning a boolean directly for example), to make function return types more consistent across recipes
3.  Updates signatures for functions exported from recipe/index to accept objects instead of params directly, to make function signatures consistent across all recipes
4.  Recipe config parameter `disableDefaultImplementation` has been renamed to `disableDefaultUI` to make the name more accurate to the effect the property has. This is applicable only if you are using the SDK with custom UI and disabling the pre-built UI that SuperTokens provides.

### Migration

1. Function return types now include a `fetchResponse` field for any function that makes a network request. If you override functions and return a custom object you will need to update your code to include a `fetchResponse` field that should be a clone of the original response object ([Refer to this page](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone))

For example if your override looks like this:

```ts
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

SuperTokens.init({
    appInfo: {
        apiDomain: "...",
        appName: "...",
        websiteDomain: "..."
    },
    recipeList: [
        EmailPassword.init({
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        signIn: async function (input) {
                            let response = makeNetworkRequest();
                            // TODO: some custom logic

                            return {
                                status: "OK",
                                user: {...},
                            };
                        },
                    }
                },
            }
        })
    ]
});
```

You will need to modify the function like this:

```ts
...
signIn: async function (input) {
    let response = makeNetworkRequest();
    // TODO: some custom logic

    return {
        status: "OK",
        user: {...},
        fetchResponse: response.clone()
    };
},
...
```

NOTE: If you use the originalImplementation in your overrides, you can access `fetchResponse` from the returned object

```ts
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";

SuperTokens.init({
    appInfo: {
        apiDomain: "...",
        appName: "...",
        websiteDomain: "..."
    },
    recipeList: [
        EmailPassword.init({
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        signIn: async function (input) {
                            let response = await originalImplementation.signIn(input);
                            // TODO: some custom logic

                            return {
                                status: "OK",
                                user: {...},
                                fetchResponse: response.fetchResponse;
                            };

                            // OR return the default implementation
                            // return await originalImplementation.signIn(input)
                        },
                    }
                },
            }
        })
    ]
});
```

2. All recipe functions now return an object instead of returning properties directly. For example:

```ts
async function isEmailVerified(input): Promise<boolean> {...}
```

Now returns

```ts
async function isEmailVerified(input): Promise<{
    status: "OK",
    isVerified: boolean,
    fetchResponse: Response, // Refer to point above
}> {...}
```

## [0.21.3] - 2022-05-14

-   Adds an example app with emailpassword + vercel
-   Reverts version of react-select dependency

## [0.21.2] - 2022-05-13

### Fixes

-   Fixed support for react 18 strict mode

### Changes

-   Updated react dependency to react 18
-   Added tests for react 18 and 16.
-   Changed how linking is done for tests apps
-   Changed e2e tests to not query test oauth provider when fetching profile info - since they are rate limited.

## [0.21.1] - 2022-05-13

-   Adds debug logging

## [0.21.0] - 2022-05-11

### Changes

-   Now updating the session context when the access token payload is updated
-   Updated supertokens-webiste dependency to ^11.0.0

### Added

## [0.20.5] - 2022-05-10

### Adds

-   An example app with emailpassword + vercel
-   A new config property `cookieHandler` that allows for custom handling when the SDK reads/writes cookies
-   A new config property `windowHandler` that allows for custom handling when the SDK uses any functions from the Window API.
-   An example app with thirdpartypasswordless + Electron

## [0.20.4] - 2022-04-11

-   Makes error message for changing of props in `SessionAuth` more clear.
-   Freezes dependency lib versions since sometimes there can be unexpected changes in those that break our UI.

## [0.20.3] - 2022-04-08

### Refactor

-   Uses PropsWithChildren to define the type of the children props

## [0.20.2] - 2022-04-07

### Fixes

-   Fixed FormBase behavior when mounted multiple times (NextJS issue)

### CI changes

-   Now using parallel builds
-   Screenshotting failed tests
-   Exporting test results

## [0.20.1] - 2022-03-31

### Changed

-   Refactor to the URL for the powered by component displayed on the auth forms

## [0.20.0] - 2022-03-17

### Added

-   ThirdParty+Passwordless recipe

### Changed

-   Adds 3 retries to mocha tests

### Breaking changes

-   Removed footer prop from `PasswordlessEmailForm`, `PasswordlessPhoneForm` and `PasswordlessEmailOrPhoneForm` overridable components.

## [0.19.0]

### Breaking changes

-   Reworked feature components with several changes in state handling
-   Component override keys changed (all ending in `_Override` now)
-   Removed `ThirdPartyEmailPasswordSignInAndUpForm` overrideable component (now reusing overrides of the email password recipe)

### Bug fix:

-   Fixed default translation strings for passwordless sign-in/up form labels

## [0.18.7] - 2022-02-11

### Optimised

-   Uses React.useMemo instead of useEffect in routing component to make first render non null

### Added

-   Adds test for third party with email verification

### Bug fix:

-   Fixes normalisation of thirdparty config to also normalise email verification config.

## [0.18.6] - 2022-02-03

### Added

-   passwordless demo app
-   Adds example app with Hasura
-   Adds example app with thirdpartyemailpassword showcasing setting password after email verification
-   Translateable components

### Refactors

-   Refactored some more pure components into functional
-   Feature components now provide a stable modified recipe implementation as a prop instead of getter

## [0.18.5] - 2022-01-27

### Fixes

-   Added `defaultCountry` to passwordless config input in the `EMAIL_OR_PHONE` case

-   add workflow to verify if pr title follows conventional commits

## [0.18.4] - 2022-01-24

-   swapped out the PureComponent to functional + memo in the files i came across
-   removed the explicit JSX.Element return type, they can be inferred and would probably be better as-is.

## [0.18.3] - 2022-01-23

### Fixes

-   Sends an empty JSON body in email verification token generate API since the content type is application/json + enforces that at least an empty JSON body must be sent in all API calls to the backend.

## [0.18.2] - 2022-01-22

### Changes

-   Fix sample code in docs which gives error "multiple children were provided"
-   Does not modify react router dom object. Instead, we create a new object which contains react-router-dom + custom navigation function.

## [0.18.1] - 2022-01-18

### Changes

-   Removed SuperTokensBranding from the oauth callback screen
-   Makes custom social provider button be a JSX element or a function
-   Changes powered by link to point to `https://supertokens.com?campaign=poweredby`

## [0.18.0] - 2022-01-14

### Changes

-   Extracts away AuthRecipe into one with email verification and one without email verification
-   Updated the reset password form to match the single input forms of passwordless (showing label, removed placeholder and autofocus)
-   Using the default label and no placeholder for the reset password email form instead of the ones configured for the signup form
-   Removed ":" from labels
-   Adds new CSS class for provider button (like `providerGoogle`, `providerApple` etc..) which super seeds `providerButton`.
-   Added a branding element to sign-in/up

### Adds

-   Passwordless recipe

### Fixes

-   Prevents checking of if route can be handled by supertokens on each rerender.

### Breaking changes

-   `getRoutingComponent` now returns ` JSX.Element | null` instead of ` JSX.Element | undefined`
-   Removed ":" from labels
-   Adds new CSS class for provider button (like `providerGoogle`, `providerApple` etc..) which super seeds `providerButton`. So if you are using `providerButton` to change CSS, then you should add a `!important` to it.

## [0.17.9] - 2022-01-07

### Changes

-   Removes @emotion/cache from dependencies since `@emotion/react` already depends on it.

### Fixes

-   Rendering of UI in firefox with nextjs: https://github.com/supertokens/supertokens-auth-react/issues/354

## [0.17.8] - 2021-12-27

###

-   Issuer where custom provider buttons would not render text in the center of the button

## [0.17.7] - 2021-12-21

### Fixes

-   Issue where custom button styling would not reflect for hover and active states
-   Issuer where custom styling would not reflect in forgot password or email verification flows

### Changes

-   Styling for social login provider buttons

## [0.17.6] - 2021-11-16

### Adds

-   Compatibility with FDI 1.11

## [0.17.5] - 2021-11-20

### Adds

-   Compatibility with react router dom v6

## [0.17.4] - 2021-11-17

### Changes

-   Removed circular dependencies
-   Added circular dependency checking into CI/pre-commit hooks

## [0.17.3] - 2021-11-15

-   Uses supertokens-js-override from npm

## [0.17.2] - 2021-10-28

### Changes

-   Fixes issue two in https://github.com/supertokens/supertokens-node/issues/199
-   Adds FDI 1.10 as supported
-   Does not set `redirect_uri` third party authorisation URL if it's already set by the backend.
-   Adds an optional `clientId` input to providers to be sent during the `signinup` API.

## [0.17.1] - 2021-10-28

### Changes

-   Uses non arrow functions in api and recipe interface impl to allow for "true" inheritance in override: https://github.com/supertokens/supertokens-node/issues/199
-   Uses `bind(this)` when calling original implementation
-   Added bundle size checking for PRs

## [0.17.0] - 2021-10-01

### Breaking changes

-   Renames `getJWTPayloadSecurely` to `getAccessTokenPayloadSecurely`

## [0.16.0] - 2021-10-01

### Changed

-   Version of supertokens-website dependency (to version `^9.0.0`). It was a breaking change in that, which implies a breaking change here too.

## [0.15.11] - 2021-09-29

### Changed

-   Disabled source map generation
-   Added prop-types as a peer dependency

## [0.15.10] - 2021-09-27

### Changed

-   New FDI 2.9

## [0.15.9] - 2021-09-19

### Added

-   Support for testing non node JS backend SDK with end to end tests written here.

## [0.15.8]

### Added

-   Update to supertokens-website dependency version
-   Updated the typings of the `UNAUTHORISED` event to include the new `sessionExpiredOrRevoked` property.

## [0.15.7]

### Added

-   Added option to apply styling to all components: https://github.com/supertokens/supertokens-auth-react/issues/312
-   Not loading Rubik font in the library if the user has defined a font to use: https://github.com/supertokens/supertokens-auth-react/issues/303

## [0.15.6] -

### Fixes

-   Saving of success event post sign up / in, so that it can be fired post email verification: https://github.com/supertokens/supertokens-auth-react/issues/315

## [0.15.5] -

### Fixes

-   Fixes custom styling of the OAuth callback screen
-   Persisting theme choice in test application

## [0.15.4] - 2021-08-19

### Fixes

-   Fixes extra semicolon at the end of thirdparty sign in up component.

## [0.15.3] - 2021-08-04

### Fixes

-   https://github.com/supertokens/supertokens-auth-react/issues/299

## [0.15.2] - 2021-07-29

### Fixes

-   Fixes typescript issue with default imports. (Related to https://github.com/supertokens/supertokens-auth-react/issues/297)

## [0.15.1] - 2021-07-16

### Fixed:

-   Handles `Uncaught ReferenceError: process is not defined` during getting if testing or not.

## [0.15.0] - 2021-07-01

### Fixed:

-   Styling issues with SVG icons
-   In `emailVerificationAuth`, querying for is email verified only if a session exists
-   A few test app issues
-   If visiting auth page with session already existing, then we respect redirectTo query param
-   Uses `useRef` hook when using `withRouter` so that the underlying component is not unmounted.
-   If `redirectToPath` is "", and we are not using react-router-dom, then we redirect to `/`, otherwise we might be stuck in an infinite redirect loop.

### Refactor

-   Uses `SessionAuth` for all our components: https://github.com/supertokens/supertokens-auth-react/issues/241
-   Creates an `AuthWidgetWrapper` component that will redirect login UI if already logged in

### Added

-   Allows for `SessionAuth` to be inside another `SessionAuth`.
-   Updates session context on session changes: https://github.com/supertokens/supertokens-auth-react/issues/228
-   `onSessionExpired` optional prop on `SessionAuth`, `EmailPasswordAuth`, `ThirdPartyAuth` and `ThirdPartyEmailPasswordAuth`

### Breaking changes

-   If a component is wrapped in an auth wrapper with `requiredAuth={true}`, and `onSessionExpired` is not provided, then the user will be automatically redirected to the login screen in case of session expiry.

-   The components override API has changed from `(DefaultComponent) => (props) => React.Element` to `({ DefaultComponent, …props }) => React.Element`.

## [0.14.1] - 2021-07-01

### Refactor:

-   Normalisation of thirdpartyemailpassword input

### Fixed:

-   Allows zero thirdparty providers to be passed into thirdpartyemailpassword
-   Respects `disableEmailPassword` config provided to thirdpartyemailpassword

### Changed:

-   Makes `signInAndUpFeature` config optional in `thirdpartyemailpassword.init`

## [0.14.0] - 2021-06-24

### Added:

-   Ability to override recipe functions to customize the behavior of feature components.
-   Refactors code to:
    -   Make types simpler.
    -   Remove components folder from AuthRecipeModule, and puts them in the themes of the respective recipes.
    -   Uses redirectToAuth everywhere instead of calling redirect manually.
    -   Adds additional props / config to Session and EmailVerification recipe to make them more isolated
    -   Passes recipe to feature components directly, as opposed to recipeId
-   In session recipe, we remove `setAuth0API` and `getAuth0API`
-   Removes `GET_REDIRECTION_URL` from the possible action types for `getRedirectionURL`.
-   Changes `redirectToAuth` to take an object and adds `redirectBack` param, which can be used to indicate if the user should be redirected to the current page.
-   Removes `getRefreshURLDomain` function from session recipe.
-   Moves `SIGN_OUT` even and pre API hook into the Session recipe.
-   Change to type of `preAPIHook` function
-   Uses supertokens-website version >= 8.0
-   Changed `SIGN_IN`, `SIGN_UP` Pre API hook action to `EMAIL_PASSWORD_SIGN_IN`, `EMAIL_PASSWORD_SIGN_UP` or `THIRD_PARTY_SIGN_IN_UP`

### Fixed:

-   State update post unmounting when using EmailVerification wrapper.

## [0.13.2] - 2021-06-05

### Added:

-   Allow specifying of `cookieDomain` in config to add interceptors to multiple API subdomain: https://github.com/supertokens/supertokens-website/issues/58

## [0.13.1] - 2021-05-28

### Fixed:

-   Respects case sensitive when redirecting post login: https://github.com/supertokens/supertokens-auth-react/issues/252

## [0.13.0] - 2021-05-11

### Added:

-   Support for sessions if used within an iframe: https://github.com/supertokens/supertokens-website/issues/53

## [0.12.1] - 2020-05-07

### Changed

-   Update to supertokens-website dependency version

## [0.12.0] - 2020-05-05

### Breaking changed

-   Fixes https://github.com/supertokens/supertokens-auth-react/issues/220
-   When using `getSuperTokensRoutesForReactRouterDom`, use it like `getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))`
-   Config value `useReactRouterDom` is no longer required. React router dom is enabled only if the user uses `getSuperTokensRoutesForReactRouterDom`.

## [0.11.0] - 2020-05-02

### Changed

-   Uses frontend set cookies instead of localstorage so that sub domain session works on Safari
-   Sends `rid` on each request - acts as a CSRF protection measure (see https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-of-custom-request-headers)
-   Refreshes session if the frontend set cookies are deleted (due to privacy features in Safari).
-   New FDI 1.8

## [0.10.1] - 2020-05-02

### Fixed

-   https://github.com/supertokens/supertokens-auth-react/issues/240

## [0.10.0] - 2020-04-28

### Changed

-   Adds `apiGatewayPath` in `appInfo`. Related to https://github.com/supertokens/supertokens-core/issues/234

## [0.9.1] - 2020-04-24

### Added

-   Ability to send custom error messages from signinup API for thirdparty login to show in the UI. Fixes issue https://github.com/supertokens/supertokens-core/issues/233

## [0.9.0] - 2020-04-14

### Added

-   Exports `SessionAuth` wrapper
-   Adds `requireAuth` boolean to all Auth wrappers to protect pages optionally
-   Creates a session context that is passed to child components for easy access to session info.

### Changed

-   `getUserId` and `doesSessionExist` returning `Promises`

## [0.8.0] - 2020-03-30

### Added

-   Signout function from session
-   Compatibility with FDI 1.7
-   Adds `redirectToAuth` function for all auth recipes

### Changed

-   Removed type dependency on History

## [0.7.2] - 2020-03-05

### Fix

-   Fix URL Normalisation with "/.netlify/functions/api".

## [0.7.1] - 2020-03-04

### Fix

-   Fix Path Normalisation with "/.netlify/functions/api" given as apiBasePath

## [0.7.0] - 2020-02-20

### Added

-   Third Party & Email Password recipe
-   Update preAPIHook type from `({RequestInit, action}) => Promise<RequestInit>` to `({url, RequestInit, action}) => Promise<RequestInit | {RequestInit, url}>`

## [0.6.0] - 2020-02-16

### Added

-   Third Party recipe with Google/Github/Facebook/Apple

### Changes

-   Introduce AuthRecipeModule to abstract common functions (hooks, signout, isEmailVerified)
-   Email Verification as a recipe
-   Email Password context from `{action: "SIGN_IN_COMPLETE" | "SIGN_UP_COMPLETE"}` to `{action: "SUCCESS", isNewUser: boolean}`

## [0.5.6] - 2020-02-06

### Fixes

-   Fix react-router-dom issue with EmailPasswordAuth in NextJS.

### Added

-   Supertokens config `useReactRouterDom`.

## [0.5.5] - 2020-02-04

### Fixes

-   Compare window.location.origin to websiteDomain for redirection => useful for multitenancy

## [0.5.4] - 2020-02-03

### Fixes

-   Fix websiteBasePath = "/" routing issue.

## [0.5.3] - 2020-02-02

### Fixes

-   Fix getRedirectionURL hook type
-   No redirectToPath in email verification screen

## [0.5.2] - 2020-02-01

### Changed

-   Redirect to intended page post authentication

## [0.5.1] - 2020-01-27

### Fixes

-   Use tsconfig to compile instead of babel

## [0.5.0] - 2020-01-22

### Changed

-   Success/Error ticks displayed in input
-   Show password displayed in inputs
-   Better password manager handling
-   Remove autofill browser styling

### Fixes

-   User Facing typescript definitions
-   setState race condition for redirecting to auth page on successful signup

### Added

-   Examples folder

## [0.4.3] - 2020-01-18

### Changed

-   Input border radius from 8 to 6px
-   Input padding from 20 to 16px
-   Input background colour from 1 to 0.25 opacity on focus

## [0.4.2] - 2020-01-18

### Changed

-   Add focus state box shadow
-   Show password icon only when password is not empty

### Fixes

-   Fix width when wrapped in flex container
-   Fix right input padding

## [0.4.1] - 2020-01-16

### Fixes

-   Mobile responsiveness

## [0.4.0] - 2020-01-07

### Added

-   Email Verification Feature
-   Show/Hide password
-   Success tick

### Changed

-   Design revamp

### Removed

-   Remove generalErrorBackground

## [0.3.0] - 2020-12-30

### Added

-   Button ripple effect on click
-   Button colour change on hover

### Fixed

-   Upgrade to Emotion v11 and react-shadow v19
-   Fix conflicting dependencies with npm link
-   No Shadow DOM for Internet Explorer

## [0.2.2] - 2020-12-16

### Fixed

-   Made config optional when calling init for recipes

## [0.2.1] - 2020-12-10

### Added

-   Better error message for SSR.

### Fixes

-   Add margin bottom for general Errors.
-   Move react-router-dom to optional dependencies.

## [0.2.0] - 2020-11-27

### Added

-   Form validation on blur
-   verify if email exists on blur during signup
-   Autocomplete email and password
-   Move error/success ticks to leave space for password managers
-   `DefaultToSignUp` config and default widget to sign up form.

### Fixes

-   Remove all styles from feature wrapper

## [0.1.0] - 2020-11-18

### Added

-   Email and password implementation
-   Session implementation
