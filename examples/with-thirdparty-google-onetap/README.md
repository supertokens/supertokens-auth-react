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

Google's one tap library calls a callback function with the ID token on a successful login. We then use the provided ID token with the Sign In Up API to complete the login process.

### On the frontend

The demo uses the pre-built UI, but you can always build your own UI instead.

-   We override the provider list to display One Tap UI in the place of Google button. That's achieved through a custom react component included in the example. The component accepts google client config and a callback.
-   The `doLogin` function defined in the `App.tsx` contains the logic to complete the login.
  -    We first call the `getAuthorisationURLWithQueryParamsAndSetState` function to create client state
  -    Then we call the sign in up API with the ID token available as `data.credential`.
  -    Note that `authCode` and `state` are added in to the `userContext` and `getAuthCodeFromURL` & `getAuthStateFromURL` have been overridden in the `config.tsx` to use these values when available.
-    `useShadowDom` is set to `false` in the `config.tsx` to let the google one tap library render the UI in the right parent element.

### On the backend

-   We override the built in Google Provider to override the `getProfileInfo` function to get the user's info from the ID token payload.
-   We override the sign in up API to call the Google API to verify the ID token and return the ID token payload. This can also be achieved using a JWT verification library. We then call the original implementation with the ID token payload as `authCodeResponse`.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
