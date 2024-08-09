![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens OAuth2 Authorization Server

This example app uses SuperTokens `OAuth2Provider` recipe to expose OAuth2 APIs. This app acts as an OAuth2 authorization server for other OAuth2 examples in this repo.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/st-oauth2-authorization-server
npm install
```

## Update Environment variables

The frontend runs on `http://localhost:3005` and the backend on `http://localhost:3006` by default. You can customize these by setting the environment variables `REACT_APP_AUTH_SERVER_WEBSITE_URL` and `REACT_APP_AUTH_SERVER_API_URL`.

## Run the demo app

This compiles and serves the React app and starts the backend API server.

```bash
npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
