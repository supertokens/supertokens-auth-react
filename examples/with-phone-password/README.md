![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Phone number & password Demo app

This demo app demonstrates the following use cases:

-   Login and sign up using phone number and password
-   Reset password using phone number SMS
-   Phone number verification using OTP
-   Session management & Calling APIs

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-phone-password
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start on `http://localhost:3000`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server` folder.

## Sending SMS

You will need to change the api-server code to send SMS or password reset SMS

By default, the password reset link and the OTP are written to the console.

## Customisations

This demo app uses the EmailPassword and Passwordless recipes to achieve the auth flow. It requires several customisations on the backend and frontend:

### Frontend

-   Add a custom `PhoneVerifiedClaim`.
-   Override `getGlobalClaimValidators` in the Session recipe to add a validator for `PhoneVerifiedClaim`. This will add an error into `invalidClaims` in the session context of components wrapped by `SessionAuth` if `PhoneVerifiedClaim` is missing or set to false.
-   We modify the sign up and in forms to replace the "Email" label and place holder with "Phone number" (using formFields config).
-   We add a custom validator for phone number in which we add logic to check for the input phone number syntax.
-   Added text translation to password reset forms and sign-in / up forms
-   We disable the default UI of passwordless recipe and render a modified version on the `/verify-phone` route
-   We create a route for the second challenge (to verify phone number via OTP) on `/auth/verify-phone`. On this route, we send the OTP and ask the user to enter the OTP.
-   Provide `getRedirectionURL` to the `EmailPassword.init` function to redirect the user to the second login challenge in case the first challenge is complete.
-   We override the enter phone number component for the passwordless recipe to send the OTP to the phone number directly - as opposed to it asking the user to enter it again.
-   We override the "Change phone number button" in the enter OTP screen with a custom button that will log the user out and take them back to the first login challenge.

### Backend

-   Add a custom `PhoneVerifiedClaim`.
-   Override `getGlobalClaimValidators` in the Session recipe to add a validator for the `PhoneVerifiedClaim` claim. This will only allow calls to your APIs if PhoneVerifiedClaim has been set to true
-   Modify the `createNewSession` function to add `PhoneVerifiedClaim` when the first login (phone and password) is done. This defaults to false. We also add the phone number of the user in the session so that the frontend can access it to send the OTP without asking the user for it.
-   Override `createCodePOST` (OTP creation API) in the Passwordless recipe to allow the creation of OTPs for only the phone number that was used in the first login challenge.
-   Modify `consumeCodePOST` (OTP verifying API) in the Passwordless to mark the second factor as done.
-   Modify `consumeCodePOST` and `createNewSession` to avoid creating a new session when the second factor is completed.
-   Change email validation logic on the backend (in emailpassword recipe) to validate phone number syntax.
-   Change how password reset email is sent to instead send an SMS to the phone.

## Future work:

-   Change style of sign-in / up form input to accept phone numbers via a dropdown UI to select the country code.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
