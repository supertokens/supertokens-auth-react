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

You will need to change the api-server code to send SMS dor password reset SMS

By default, the password reset link and the OTP are written to the console.

## Customisations

This demo app uses the EmailPassword and Passwordless recipes to achieve the auth flow. It requires several customisations on the backend and frontend:

### Frontend

-   We modify the sign up and in forms to replace the "Email" label and place holder with "Phon number" (using formFields config).
-   We add a custom validator for phone number in which we add logic to check for the input phone number syntax.
-   Added text translation to password reset forms and sign in / up forms
-   Change the doesSessionExist function on the frontend to return true only when the access token payload has phoneNumberVerified === true. This allows users to see the application only when both the login challenges are complete
-   We create a route for the second challenge (to verify phone number via OTP) on `/auth/verify-phone`. On this route, we send the OTP and ask the user to enter the OTP. Also, in case a session doesn't exist, we redirect the user back to the first login challenge.
-   Provide `getRedirectionURL` to the EmailPassword.init function to redirect the user to the second login challenge in case the first challenge is complete.
-   We disable the default UI of passwordless recipe so that we can render what we want on the /verify-phone route
-   We override the enter phone number component for passwordless recipe to send the OTP to the phone number directly - as opposed to it asking the user to enter it again.
-   We override the "Change phone number button" in the enter OTP screen with a custom button which will logout the user and take them back to the first login challenge.

### Backend

-   Change email validation logic on the backend (in emailpassword recipe) to validate phone number syntax.
-   Change how password reset email is sent to instead send an SMS to the phone.
-   We modify the createNewSession function to add phoneNumberVerified: false when the first login (phone and password) is done. Then when the second challenge is done too, we mark the session to have phoneNumberVerified: true. We also add the phone number of the user in the session so that the frontend can access it to send the OTP without asking the user for it.
-   Adds a middleware that runs after verifySession which will allow access to the API only if the access token payload has phoneNumberVerified: true
-   Overrides OTP creation API in Passwordless recipe to allow creation for OTP for only the phone number that was used in the first login challenge

## Future work:

-   Change style of sign in / up form input to accept phone number via a drop down UI to select the country code.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
