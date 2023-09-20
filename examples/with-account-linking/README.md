![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Google one tap Demo app

This demo app demonstrates the following use cases:

-   Thirdparty Login / Sign-up
-   Email Password Login / Sign-up
-   Logout
-   Session management & Calling APIs
-   Account linking

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-account-linking
npm install
cd frontend && npm install && cd ../
cd backend && npm install && cd ../
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start on `http://localhost:3000`

## How it works

We are adding a new (`/link`) page where the user can add new login methods to their current user, plus enabling automatic account linking.

### On the frontend

The demo uses the pre-built UI, but you can always build your own UI instead.

-   We do not need any extra configuration to enable account linking
-   To enable manual linking through a custom callback page, we add `getRedirectURL` to the configuration of the social login providers.
-   We add a custom page (`/link`) that will:
    -   Get and show the login methods belonging to the current user
    -   Show a password form (if available) that calls `/addPassword` to add an email+password login method to the current user.
    -   Show a phone number form (if available) that calls `/addPhoneNumber` to associate a phone number with the current user.
    -   Show an "Add Google account" that start a login process through Google
-   We add a custom page (`/link/tpcallback/:thirdPartyId`) that will:
    -   Call `/addThirdPartyUser` through a customized `ThirdPartyEmailPassword.thirdPartySignInAndUp` call

### On the backend

-   We enable account linking by initializing the recipe and providing a `shouldDoAutomaticAccountLinking` implementation
-   We add `/addPassword`, `/addPhoneNumber` and `/addThirdPartyUser` to enable manual linking from the frontend
-   We add `/userInfo` so the frontend can list/show the login methods belonging to the current user.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
