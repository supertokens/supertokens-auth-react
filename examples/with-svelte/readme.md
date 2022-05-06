![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdpartyEmailPassword demo app with Svelte

This demo app demonstrates the following use cases:

-   Login (on /signin) with email password
-   Sign up (on /signup) with email password
-   Logout
-   Forgot password flow
-   Session management 
-   ThirdParty Auth with google and github

This also showcases how you can use the supertokens-auth-react SDK and any general react components inside a svelte app without any additional libraries.

## Project setup

Use `npm` to install the project dependencies:

```bash
cd client
npm install

cd ../server
npm install
```

## Run the demo app

This compiles and serves the Svelte App on port 8080 and starts up a server on port 4000.

```bash
cd client
npm run dev

cd ../server
npm run dev
```

The app will start on `http://localhost:8080`

If you would like to modify the website (http://localhost:8080) or the API server (http://localhost:4000) URL:

-   Change the `apiPort` or `apiDomain` values in `server/index.js`
-   Change the `apiPort` or `apiUrl` values in `client/src/App.svelte`
-   Change the `websitePort` or `websiteDomain` values in `server/index.js`
-   Change the `websitePort` or `websiteUrl` values in `client/src/App.svelte`

## Project structure & Parameters

-   The frontend code is located in the `client/src` folder.
-   The backend API is in the `server/index.js` file.

## Author

Created with :heart: by the folks at supertokens.com.


