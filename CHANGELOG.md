# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.3] - 2020-12-24
### Fixed
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