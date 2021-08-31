![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Demo app

This demo app demonstrates the following use cases while using _no cookies set by the API_:

-   Login
-   Sign up
-   Logout
-   Forgot password flow
-   Session management & Calling APIs
-   Using localstorage instead of cookies to store tokens (there are some locally used cookies set on the front-end)

Storing tokens in localstorage comes with a few drawbacks:

-   Increased damage potential of XSS attacks, because they can now access the longer term refresh token
-   Expired tokens are not automatically removed
-   No session info during server side rendering
-   You can't share sessions across subdomains

For a detailed comparison please see [our blog](https://supertokens.io/blog/cookies-vs-localstorage-for-sessions-everything-you-need-to-know)

## How the modification works

The basic idea behind it is that we can use a custom header to transfer tokens. This way, the frontend can access and
store them in localstorage or wherever desired and use them to authenticate requests.

### Backend

On the backend, we need to do two things:

-   Load tokens from a custom header instead of the `Cookie` header
-   Use a custom header to communicate changes to the tokens instead of setting them as cookies

### Frontend

On the frontend we need to do two things:

-   When making a request to the API, we need to add a custom header that contains the tokens we would normally send as cookies
-   After getting a response from the API, we need to inspect the headers and store the contents of a custom header

We can achieve these by replacing the global fetch function with a "patched" version. This must be done before initializing SuperTokens (calling `SuperTokens.init`) as the SDK uses the fetch function internally.

If you use `axios` (or a similar library) to make requests, you also need to add an interceptor that will do the same.

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install -d
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server.js` file.
-   You can provide the following params to the `npm run` commands:
    -   `REACT_APP_API_PORT`: To change the port for the API. The default is `3001`
    -   `REACT_APP_API_URL`: In case the API is not hosted on `localhost`. This must contain the port as well.
    -   `REACT_APP_WEBSITE_PORT`: To change the port of the website server. The default is `3000`
    -   `REACT_APP_WEBSITE_URL`: In case the website is not hosted on `localhost`. This must contain the port as well.

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Running in production

```bash
npm run prod
```

## Author

Created with :heart: by the folks at SuperTokens.io.

## License

This project is licensed under the Apache 2.0 license.
