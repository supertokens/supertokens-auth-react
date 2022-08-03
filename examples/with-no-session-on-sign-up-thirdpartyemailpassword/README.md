![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdPartyEmailPassword Demo app

This demo app demonstrates the following use cases:

-   Social Login
-   Email & Password login
-   Social / email password sign up which doesn't create a new session, but instead prompts the user to sign in again.
-   Forgot password flow
-   Logout
-   Session management & Calling APIs

## Required changes:

-   For social login and email password sign ups, we disable creation of a new session. We do this by using the [API override feature](https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/apis-override/usage). You can find the source code of these APIs in api-server/customSignInUpPOST.js (for social login) and api-server/customSignUpPOST.js (for email password login).
-   On the frontend, we want to show a message to the user to login again post a successful sign up. We do this by:
    -   When a sign up even is triggered (see implementation of `onHandleEvent` in src/App.js), we set localstorage to show the sign in again message.
    -   We use the [react component override feature](https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/react-component-override/usage), to show a custom message if that flag is set in localstorage. We override the `ThirdPartyEmailPasswordHeader` component to show the custom message, and the react component for that can be found in src/App.js > `function SignInMessage() {...}`

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-no-session-on-sign-up-thirdpartyemailpassword
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

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
