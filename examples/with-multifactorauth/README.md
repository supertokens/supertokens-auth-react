![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Google one tap Demo app

This demo app demonstrates the following use cases:

-   Thirdparty Login / Sign-up
-   Email Password Login / Sign-up
-   Logout
-   Session management & Calling APIs
-   Per-user multi-factor auth settings

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
-   We show an extra section on the Home page that is used to display and update MFA settings

### On the backend

-   We override `getMFARequirementsForAuth` to take the user settings into account (fetched/stored using UserMetadata)
-   Add `/updateMFA` that the user can call to update their sign-in requirements

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
