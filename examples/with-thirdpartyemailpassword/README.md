![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Demo app

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Logout
-   Session management & Calling APIs

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

# Providers credentials

Copy the `.env.example` file and add your credentials:

```bash
   cp .env.example .env
```

Please refer to the corresponding documentations to get your client ids and client secrets for each of the providers you want to integrate with:<br/>

-   <a href="https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials" rel="noopener noreferrer" target="_blank" >Google</a><br/>
-   <a href="https://docs.github.com/en/developers/apps/creating-an-oauth-app" rel="noopener noreferrer" target="_blank" >Github</a><br/>
-   <a href="https://developers.facebook.com/docs/development/create-an-app" rel="noopener noreferrer" target="_blank" >Facebook</a><br/>
</div>

Set redirect URI to http://localhost:3000/auth/callback/{providerId} in each developer panels (make sure to replace `providerId` with `google | facebook | github`).

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server.js` file.
-   You can provide the following params to the `npm run` commands:
    -   `REACT_APP_API_PORT`: To change the port for the API. The default is `3001`
    -   `REACT_APP_API_URL`: In case the API is not hosted on `localhost`. This must contain the port as well.
    -   `REACT_APP_WEBSITE_PORT`: To change the port of the website server. The default is `3000`
    -   `REACT_APP_WEBSITE_URL`: In case the website is not hosted on `localhost`. This must contain the port as well.

## Author

Created with :heart: by the folks at SuperTokens.io.

## License

This project is licensed under the Apache 2.0 license.
