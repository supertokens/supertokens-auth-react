# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [0.9.0] - 2020-04-14

### Added
- Exports `SessionAuth` wrapper
- Adds `requireAuth` boolean to all Auth wrappers to protect pages optionally
- Creates a session context that is passed to child components for easy access to session info.

### Changed
- `getUserId` and `doesSessionExist` returning `Promises`

## [0.8.0] - 2020-03-30

### Added
- Signout function from session
- Compatibility with FDI 1.7
- Adds `redirectToAuth` function for all auth recipes

### Changed
- Removed type dependency on History

## [0.7.2] - 2020-03-05

### Fix
- Fix URL Normalisation with "/.netlify/functions/api".

## [0.7.1] - 2020-03-04

### Fix
- Fix Path Normalisation with "/.netlify/functions/api" given as apiBasePath

## [0.7.0] - 2020-02-20

### Added
- Third Party & Email Password recipe
- Update preAPIHook type from `({RequestInit, action}) => Promise<RequestInit>` to `({url, RequestInit, action}) => Promise<RequestInit | {RequestInit, url}>`

## [0.6.0] - 2020-02-16

### Added
- Third Party recipe with Google/Github/Facebook/Apple

### Changes
- Introduce AuthRecipeModule to abstract common functions (hooks, signout, isEmailVerified)
- Email Verification as a recipe
- Email Password context from `{action: "SIGN_IN_COMPLETE" | "SIGN_UP_COMPLETE"}` to `{action: "SUCCESS", isNewUser: boolean}`

## [0.5.6] - 2020-02-06

### Fixes
- Fix react-router-dom issue with EmailPasswordAuth in NextJS.

### Added
- Supertokens config `useReactRouterDom`.
## [0.5.5] - 2020-02-04

### Fixes
- Compare window.location.origin to websiteDomain for redirection  => useful for multitenancy

## [0.5.4] - 2020-02-03

### Fixes
- Fix websiteBasePath = "/" routing issue.

## [0.5.3] - 2020-02-02

### Fixes
- Fix getRedirectionURL hook type
- No redirectToPath in email verification screen

## [0.5.2] - 2020-02-01

### Changed
- Redirect to intended page post authentication

## [0.5.1] - 2020-01-27

### Fixes
- Use tsconfig to compile instead of babel

## [0.5.0] - 2020-01-22

### Changed
- Success/Error ticks displayed in input
- Show password displayed in inputs
- Better password manager handling
- Remove autofill browser styling

### Fixes
- User Facing typescript definitions
- setState race condition for redirecting to auth page on successful signup

### Added
- Examples folder
## [0.4.3] - 2020-01-18

### Changed
- Input border radius from 8 to 6px
- Input padding from 20 to 16px
- Input background colour from 1 to 0.25 opacity on focus

## [0.4.2] - 2020-01-18

### Changed
- Add focus state box shadow
- Show password icon only when password is not empty

### Fixes
- Fix width when wrapped in flex container
- Fix right input padding
## [0.4.1] - 2020-01-16

### Fixes
- Mobile responsiveness
## [0.4.0] - 2020-01-07

### Added
- Email Verification Feature
- Show/Hide password
- Success tick

### Changed
- Design revamp

### Removed
- Remove generalErrorBackground

## [0.3.0] - 2020-12-30

### Added
- Button ripple effect on click
- Button colour change on hover

### Fixed
- Upgrade to Emotion v11 and react-shadow v19
- Fix conflicting dependencies with npm link
- No Shadow DOM for Internet Explorer


## [0.2.2] - 2020-12-16
### Fixed
- Made config optional when calling init for recipes

## [0.2.1] - 2020-12-10
### Added
- Better error message for SSR.

### Fixes
 - Add margin bottom for general Errors.
 - Move react-router-dom to optional dependencies.

## [0.2.0] - 2020-11-27
### Added
- Form validation on blur
- verify if email exists on blur during signup
- Autocomplete email and password
- Move error/success ticks to leave space for password managers
- `DefaultToSignUp` config and default widget to sign up form.

### Fixes
 - Remove all styles from feature wrapper

## [0.1.0] - 2020-11-18
### Added
- Email and password implementation
- Session implementation