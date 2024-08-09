![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# Example React App using a Generic OAuth2 Library and SuperTokens as OAuth2 Provider

This examples app demonstrates how to use SuperTokens as OAuth2 Provider in a React App using a generic OAuth2 library such as [react-oidc-context](https://github.com/authts/react-oidc-context).

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-oauth2-without-supertokens
npm install
```

## 1. Create an OAuth2 Client

```bash
curl -X POST http://localhost:4445/admin/clients \
     -H "Content-Type: application/json" \
     -d '{
           "scope": "offline_access openid email",
           "redirect_uris": ["http://localhost:3000"],
           "access_token_strategy": "jwt",
           "token_endpoint_auth_method": "none",
           "grant_types": ["authorization_code", "refresh_token"],
           "response_types": ["code", "id_token"],
           "skip_consent": true
         }'
```

Note down the `client_id` from the response.

## 2. Run the st-oauth2-authorization-server

1. Open a new terminal window and navigate to `supertokens-auth-react/examples/
st-oauth2-authorization-server`
2. Read the README.md to setup `st-oauth2-authorization-server ` and run it using `npm start`

## 3. Update config

Open the `App.tsx` file and update `clientId` and `authServerUrl` values as per step 1 and step 2.

## 4. Run the demo app

This compiles and serves the React app.

```bash
npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
