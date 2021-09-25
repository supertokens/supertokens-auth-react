![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdPartyEmailPassword Demo app

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Email & Password login
-   Forgot password flow
-   Logout
-   Session management & Calling APIs

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

# Providers credentials

Create a `.env` file (from the `.env.example` file) and add your credentials:

```bash
cp .env.example .env
```

Please refer to the corresponding documentations to get your client ids and client secrets for each of the providers you want to integrate with:<br/>

-   <a href="https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials" rel="noopener noreferrer" target="_blank" >Google</a><br/>
-   <a href="https://docs.github.com/en/developers/apps/creating-an-oauth-app" rel="noopener noreferrer" target="_blank" >Github</a><br/>

Set redirect URI to http://localhost:3000/auth/callback/{providerId} in each developer panels (make sure to replace `providerId` with `google` or `github`).

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
-   Change the `websitePort` in `server.js`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server.js` file.
-   The file `server.js` is used for serving the react app from the `build` folder (for production use)

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at SuperTokens.io.

## License

This project is licensed under the Apache 2.0 license.
