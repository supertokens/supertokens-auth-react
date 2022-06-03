![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens EmailPassword Demo app with Email Verification through OTP

This demo app demonstrates the following use cases:

-   Login with EmailPassword and Social Login
-   Email Verification with OTP
-   Logout
-   Forgot password flow
-   Session management

## Project setup

Use `npm` to install the project dependencies:

```bash
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

## Modifications for Email Verification with OTP:

You can take a look at our [quick setup](https://supertokens.com/docs/thirdpartyemailpassword/introduction) guide on how to setup EmailPassword and Social Login. Once setup we can now start making changes to our frontend and backend to enable the Email Verification with OTP flow.

### Frontend Changes:

Since Email Verification is enabled when a user signs up they will be redirected to a new screen which will prompt them to go to their email and click on the email verification link.

We will need to override this component to use our own custom UI which will allow the user to enter an OTP. We can do so by overriding the `EmailVerificationSendVerifyEmail_Override` component in our frontend.

Our custom component will contain the UI to allow the user to enter an OTP. It will contain functions which will send requests to our backend server to send the email containing the OTP to the user and requests to verify the email with the OTP.

### Backend Changes:

Our backend will need to handle two main things:

-   Generating the OTP and sending the email to the user
-   Checking that the OTP received for Email Verification is valid

#### Generating the OTP and sending the email to the user

In the regular email verification flow the url which is sent to the user for verification contains a token. This token will be used for actually verifying the user.

We will use `createAndSendCustomEmail` in our backend config where we will generate an OTP and map it to the token. We will then send the OTP to the user via email.

#### Checking that the OTP

The `verifyEmailPOST` api handles email verification on the backend. We will need to override the default behaviour and check that the OTP sent is mapped to a token and use that token for email verification.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
