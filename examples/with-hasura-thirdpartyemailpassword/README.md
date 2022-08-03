![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Hasura + ThirdPartyEmailPassword Demo app

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Email & Password login
-   Forgot password flow
-   Logout
-   Session management & Calling APIs
-   Querying Hasura with the issued JWT

You can learn more about the setup [in our docs](https://supertokens.com/docs/thirdpartyemailpassword/hasura-integration/with-jwt).

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-hasura-thirdpartyemailpassword
npm install
```

## Run the demo app

1. Run `ngrok` to list on port 3001. This will expose the API server to the internet which Hasura can query

```
ngrok http 3001
```

2. Set the resulting `ngrok` URL on Hasura dashboard as the `env` variable `HASURA_GRAPHQL_JWT_SECRET`:

```
{
    "jwk_url": "https://....ngrok.io/auth/jwt/jwks.json"
}
```

3. Set `https://....ngrok.io/auth` in the `.env` file as the value for `JWT_ISSUER_URL` key.

4. Replace the URL and query in `src/homeHome/CallAPIView.js` to match your Hasura config.

5. Start the app

```bash
npm run dev
```

The app will start on `http://localhost:3000`

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server.js`
-   Change the `apiPort` or `apiUrl` values in `src/App.js`
-   Change the `websitePort` or `websiteDomain` values in `api-server.js`
-   Change the `websitePort` or `websiteUrl` values in `src/App.js`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server.js` file.

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
