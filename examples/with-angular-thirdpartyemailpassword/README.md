![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdpartyEmailPassword demo app with Angular and React

This demo app demonstrates the following use cases:

-   Login / sign up with SuperTokens
-   Logout
-   Forgot password flow
-   Session management

In this example app, whenver we visit an auth related route (`/auth/*` in this case), we will load a React component which will initialize SuperTokens and handle the authentication flow. All other routes will use Angular Components.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Run the demo app

This compiles and serves the Angular App on port `4200` and starts up a server on port `3001`

```bash
npm run start
```

The app will start on `http://localhost:4200`

## Project structure & Parameters

-   The frontend code is located in the `/src` folder.
-   The backend API is in the `server.ts` file.

## Author

Created with :heart: by the folks at supertokens.com.
