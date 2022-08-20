![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens login to CLI

This demo app demonstrates how we can implement sign in for a CLI client in which it opens the browser and asks you to login there if not logged in already.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-cli-login
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start the frontend app on `http://localhost:3000` and the backend app on `http://localhost:3001`.

Then you can start the cli by running `npm run cli` command which will prompt you to login. Once the login is successful, the CLI took will get a long lived JWT from the backend for the logged in user.

## How it works

We use the SuperTokens passwordless recipe to achieve a magic link based flow which enables the CLI to login via the browser. When the CLI is started, it calls the backend API to generate a magic link (`getmagiclink` GET API). The magic link is then displayed to the user in the CLI.

The magic link contains two important tokens:

-   `preAuthSessionId`
-   `linkCode`

The `linkCode` is a one time use, (secret) token which is consumed in the `consumetoken` POST API. The `preAuthSessionId` is another token which has a one to one mapping with the `linkCode`, but is not a secret token. It can be used to associate any information about the user whilst the passwordless login is happening.

When the user opens the magic link, the frontend app checks that a session exists or not. If it does exist, it extracts the `preAuthSessionId` and `linkCode` token from the magic link and calls the `consumetoken` API with them. If a session does not exist, it saves the two tokens from the magic link in localstorage and redirects the user to the login flow. Post login, those tokens are read from localstorage and sent to the `consumetoken` API.

In `consumetoken`, we first do a session verification to ensure that the user is logged in. Then we read the two tokens from the request body and consume the `linkCode` token using the `Passwordless.consumeCode` function. On success, we store the userID (from the session) against the `preAuthSessionId` token.

For that mapping, we use the UserMetadata recipe from SuperTokens. Ideally you want to use your own db to store the mapping with a TTL, but for this demo, we used the UserMetadata recipe.

Whilst the above happens, the CLI is periodically calling the `/waitforlogin` API on the backend with the `preAuthSessionId`. Once the mapping of `preAuthSessionId` -> `userId` exists, we generate a JWT (using SuperTokens JWT recipe) and return that to the CLI.

The CLI is not logged in.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
