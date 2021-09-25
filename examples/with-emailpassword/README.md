![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Demo app

This demo app demonstrates the following use cases:

-   Login
-   Sign up
-   Logout
-   Forgot password flow
-   Session management & Calling APIs

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
