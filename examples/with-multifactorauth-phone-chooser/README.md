![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Multi-factor Auth with multiple phone numbers

This demo app demonstrates the following use cases:

-   Thirdparty Login / Sign-up
-   Email Password Login / Sign-up
-   Logout
-   Session management & Calling APIs
-   MFA with multiple phone numbers

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-multifactorauth-phone-chooser
npm install
cd frontend && npm install && cd ../
cd backend && npm install && cd ../
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start on `http://localhost:3000`

## How it works

We are adding a new (`/link`) page where the user can add new login methods to their current user, plus enabling automatic account linking.

### On the frontend

The demo uses the pre-built UI, but you can always build your own UI instead.

-   We override `getRedirectionURL` to redirect to the phone chooser screen instead if we are redirecting to the phone otp screen
-   We add a custom `/select-phone` page:
    -   That redirects directly to the factor screen if the user has no phone number associated for initial setup
    -   That auto-creates a code and redirects to the factor screen if the user has exactly one phone number associated
    -   That lists the phone numbers set up for the user and starts the MFA process if one is selected
    -   Sets a custom `setLoginAttemptInfo` to make sure the override below can redirect back to the selection page
-   Override `PasswordlessMFAOTPFooter_Override` to add a change phone number button if the user can select another phone number.
-   Show a button on the Home screen that redirects users the the phone-based OTP setup screen

### On the backend

-   We override `getMFARequirementsForAuth` to always require phone-based OTP.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
