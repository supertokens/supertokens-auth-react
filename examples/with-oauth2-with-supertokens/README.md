![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# Example App with SuperTokens Auth and SuperTokens as OAuth2 Provider

This example app shows how to use SuperTokens as an OAuth2 provider in a React app that already implements SuperTokens Auth, utilizing the `OAuth2Client` recipe on the backend.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-oauth2-with-supertokens
npm install
```

## 1. Create an OAuth2 Client

```bash
curl -X POST http://localhost:3567/recipe/oauth/clients \
     -H "Content-Type: application/json" \
     -d '{
           "scope": "offline_access openid email",
           "redirectUris": ["http://localhost:3000/auth/callback"],
           "tokenEndpointAuthMethod": "none",
           "grantTypes": ["authorization_code", "refresh_token"],
           "responseTypes": ["code", "id_token"]
         }'
```

Note down the `client_id` from the response.

## 2. Run the st-oauth2-authorization-server

1. Open a new terminal window and navigate to `supertokens-auth-react/examples/
st-oauth2-authorization-server`
2. Read the README.md to setup `st-oauth2-authorization-server ` and run it using `npm start`

## 3. Update config

Update `clientId` and `AUTH_SERVER_URL` values as per step 1 and step 2 in both `frontend/src/App.tsx` and `backend/src/config.ts`.

## 4. Run the demo app

This compiles and serves the React app.

```bash
npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
