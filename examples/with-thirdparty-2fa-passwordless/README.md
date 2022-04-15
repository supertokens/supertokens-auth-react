![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdParty + Passwordless 2fa demo

This demo app demonstrates how we can implement sign in with google workspaces and then add SMS OTP based 2FA on top of that.

## Changes

-   On the frontend, we add a custom provider for sign in with google workspaces
-   We initialise Passwordless recipe on the frontend and backend as per its quick setup
-   To disable sign ups via google workspaces login, we override the `signInUpPOST` API call as shown in `api-server/customSignInUpPOST.js` file.
-   We override the implementation of `doesSessionExist` on the frontend to return `false` in case the user has not completed both the auth factors. This prevents the user from accessing any protected routes.
-   We disable the UI for passwordless sign up and show it in "/second-factor" route by using the disableDefaultImplementation flag in the Passwordless config
-   We change the redirection logic for ThirdParty auth to take the user to the /second-factor route after completing sign in with google workspaces. If the user has already completed the second factor too, then we take them to the home page. We do this by providing the getRedirectionURL callback to the ThirdParty recipe on the frontend.
-   We override the consume code API for passwordless to not create a new session, but instead modify the existing session to add the second factor to it. This will then indicate to the application APIs and routes that the session exists and the user can then use the app.
-   We change the APIs to use a custom middleware which will check that the access token has both the auth factors in it. If it doesn't then we return a 401, else we allow the API call.
-   In the consume code API, on successful verification, we associate the mobile number with the session's userId. This is stored in your own db. When this user tries to login again later, we make sure that the 2fa mobile is equal to what they had used previously (else we show an error message on the frontend).
-   Finally, we override the Passwordless UI component to replace the "Sign in or up" text in there with "Second factor Auth"

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server/index.js`
-   Change the `apiPort` or `apiUrl` values in `src/App.js`
-   Change the `websitePort` or `websiteDomain` values in `api-server/index.js`
-   Change the `websitePort` or `websiteUrl` values in `src/App.js`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server/index.js` file.

## Production build

```bash
npm run build && npm run start
```

## Current drawbacks:

-   Lack of context passing in backend API forces copying of backend logic
-   It's confusing that we use `ThirdPartyAuth` wrapper and not `PasswordlessAuth` wrapper. It should be possible to just use `SessionAuth` only.
-   Sending SMS is something that you need to implement yourself entirely
-   Lack of ability to save user meta data forces dev to store the third party user ID -> phone number mapping in db manually.
-   No way of passing on redirectToPath across the 2 factors.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
