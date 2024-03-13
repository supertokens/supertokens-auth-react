![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Phone number & password Demo app

This demo app demonstrates the following use cases using the account linking and MFA recipes:

-   Login and sign up using phone number and password
-   Reset password using phone number SMS
-   Phone number verification using OTP
-   Session management & Calling APIs

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-phone-password-mfa
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

This demo app uses the EmailPassword and Passwordless recipes to achieve the auth flow. It requires some customisations on the backend and frontend:

### Frontend

-   We modify the sign up and in forms to replace the "Email" label and place holder with "Phone number" (using formFields config).
-   We add a custom validator for phone number in which we add logic to check for the input phone number syntax.
-   Added text translation to password reset forms and sign-in / up forms

### Backend

-   Change email validation logic on the backend (in emailpassword recipe) to validate phone number syntax.
-   Change how password reset email is sent to instead send an SMS to the phone.
-   We override consumeCodePOST to validate the phone number as if it was an email address to facilitate linking

## Future work:

-   Change style of sign-in / up form input to accept phone numbers via a dropdown UI to select the country code.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
