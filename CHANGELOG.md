# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [unreleased]

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
