![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdpartyEmailPassword demo app with Angular and React

This demo app demonstrates the following use cases:

-   Login / sign up with SuperTokens
-   Logout
-   Forgot password flow
-   Session management

In this demo, when our root component loads we will initialize the `supertokens-website` SDK which will be used by our other components for session management. When we visit an auth related route (`/auth/*` in this case), we will load a React component which will initialize the `supertokens-auth-react` SDK and handle the authentication flow.


## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Run the demo app

This compiles and serves the Vue App on port `4200` and starts up a server on port `3001`

```bash
npm run start
```

The app will start on `http://localhost:4200`

## Project structure

### Backend

-   The backend API is in the `server.ts` file.

### Frontend

-   The frontend code is located in the `/src` folder.
-   Our frontend will have 2 Vue components as views, a `home` and `auth`.
-   The `home` view omponent will use `supertokens-website` for session management and the `auth` view component will use `supertokens-auth-react` for Authentication flows and UI.
-   Since both the `home` and `auth` view components (since `supertokens-auth-react` SDK uses `supertokens-website`) depend on `supertokens-website`, we can initialize this library in our root component (`App`). This will also reduce the bundle sizes for the `home` and `auth` view component.
-   The `router/index.ts`  file contains our routing logic with refrences to the the `home` and `auth` view component to enable code splitting.


## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
