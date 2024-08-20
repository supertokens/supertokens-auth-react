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

## Set Up Frontend and Backend URLs

When running locally, we recommend using a different domain than `localhost` for the authorization server to prevent cookie sharing with other client apps running on `localhost`.

By default, the frontend runs at `http://localhost.com:3005` and the backend at `http://localhost.com:3006`. You can customize these by setting the `REACT_APP_AUTH_SERVER_WEBSITE_URL` and `REACT_APP_AUTH_SERVER_API_URL` environment variables.

After configuring the URLs, add the domain to `/etc/hosts`. For example, if your domain is `localhost.com`, add:

```bash
127.0.0.1   localhost.com
```

## Run the demo app

This compiles and serves the React app and starts the backend API server.

```bash
npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
