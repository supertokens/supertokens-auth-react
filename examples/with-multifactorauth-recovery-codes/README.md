![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Multi-factor Auth demo with Recovery codes

This demo app demonstrates the following use cases:

-   Thirdparty Login / Sign-up
-   Email Password Login / Sign-up
-   Logout
-   Session management & Calling APIs
-   TOTP
-   Using recovery codes if the user lost their TOTP device

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-account-linking
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

We add new (`/create-recovery-code` and `/recover`) page where the user can create and use recovery codes.

### On the frontend

The demo uses the pre-built UI, but you can always build your own UI instead.

-   We add a custom claim that can be used to tell if the user has created a recovery code or not
-   We override the footer in the TOTP entry screen to add a "Lost my device" button, redirecting to `/recover`
-   We add a custom page (`/recover`) that will:
    -   Allow the user to enter a recovery code
    -   Call a custom API that validates the recovery code (checking the hash) and adds the hash to the access token payload if valid
-   We use the custom claim mentioned above to redirect to `/create-recovery-code` if the user hasn't created (or just used) a recovery code
-   We add a custom page (`/create-recovery-code`) that can create and display a recovery code

### On the backend

-   We add a custom claim that can be used to tell if the user has created a recovery code or not
-   We store the hash of the recovery code for each user in their user metadata
-   We add `/createRecoveryCode` that a user with an active session can use to get a new recovery code
-   We add `/useRecoveryCode` that validates the recovery code (checking the hash) and adds the hash to the access token payload if valid
-   We override `assertAllowedToSetupFactorElseThrowInvalidClaimError` to allow setting up a TOTP device if a valid recovery code hash is present in the access token payload
-   We override `getMFARequirementsForAuth` to always require TOTP
-   We override `verifyDevicePOST` to clear the recovery code from the user metadata and reset the access token payload
-   We override `createNewSession` to add a value for the custom claim to tell the frontend if the user has a recovery code or not

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
