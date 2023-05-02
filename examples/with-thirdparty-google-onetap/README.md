![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Google one tap Demo app

This demo app demonstrates the following use cases:

-   Thirdparty Login / Sign-up using google one tap
-   Logout
-   Session management & Calling APIs

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-thirdparty-google-onetap
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

-   The overall flow is that google returns an ID token to the frontend post login. This ID token is then sent to the backend, which then verifies the token and creates a supertokens user for ths user along with their session.
-   This demo uses the pre build UI, but you can always build you own UI instead. For the pre built UI, we override the provider list UI to add the google one tab UI and provide it a callback handler which calls the supertokens' backend API with the id token. You can see how this is done in `App.tsx` file in the `frontend` folder, in the `doLogin` callback function.
-   On the backend, we override the sign in up API from supertokens in which we call Google's API to verify the ID token and get info from it (it can also be done using a JWT verification library). After we have the user's info, we call the original implementation with the info to login the user.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
