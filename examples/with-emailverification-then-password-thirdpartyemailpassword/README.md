![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdPartyEmailPassword Demo app with password setting post email verification

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Email & Password login
-   Forgot password flow
-   Logout
-   Session management & Calling APIs
-   During email / password sign up, we first verify the email and then we ask the user to set their password

## Required customizations

### The overall approach:

-   On first sign up via email, we set a fake, random password against the user's info. This is some unguessable string but is common for all users.
-   The above step allows us to create a new session for the user and go through the email verification flow as usual.
-   Post email verification, we show a UI for the user to set their own password and then call an API which updates their fake password with the new one.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-emailverification-then-password-thirdpartyemailpassword
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server.js`
-   Change the `apiPort` or `apiUrl` values in `src/App.js`
-   Change the `websitePort` or `websiteDomain` values in `api-server.js`
-   Change the `websitePort` or `websiteUrl` values in `src/App.js`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server.js` file.

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
