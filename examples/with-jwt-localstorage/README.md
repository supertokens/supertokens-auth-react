![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens with JWT and localstorage

This demo app demonstrates the following use cases:

-   Login
-   Sign up
-   Logout
-   Forgot password flow
-   Session management with JWT and localstorage

## When to refer to this demo app?

The SuperTokens in built session management requires use of frontend SDKs provided by us (for automatic session refreshing). If we do not support a frontend client, then you have to modify the session recipe to be simpler.

The modified flow would issue a JWT as a session token which can be sent to the frontend in the sign in or sign up response body. The frontend would save this locally and inject this as an authorization bearer token in each API request.

In this demo app, we achieve this by overriding all the functions of the session recipe on the backend. We issue a new JWT using SuperTokens on `createNewSession` function, and send this in the response body from the sign in and sign up API response (again, we override the default APIs to achieve this).

For session verification, we override the `getSession` function on the backend to fetch this JWT from the request header and then verify it.

On the frontend, since we are using our supertokens-auth-react SDK, we save the JWT from the sign in / up response using `postAPIHooks`, and inject the JWT in the request using `preAPIHooks`. We also override the Session recipe functions to run based on if the JWT is present in localstorage or not.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-jwt-localstorage
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
