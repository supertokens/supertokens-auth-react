![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Passwordless (email or phone number) + Social login Demo app with Electron client

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Login / sign up using OTP or magic link
-   Logout
-   Session management & Calling APIs

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-thirdpartypasswordless-electron
npm install
```

## Set environment variables

The demo app contains code for seding emails to the user for passwordless auth. You need to set the following environment variables for the email user before running the demo app:

```bash
NODEMAILER_USER
NODEMAILER_PASSWORD
```

You can do this by:

-   Editing the `.env.example` file
-   Rename the `.env.example` file to `.env`

## Run the demo app

This compiles and serves the Electron app and starts the backend API server on port 3001.

```bash
npm run dev
```

In dev mode the app will start a webpack dev server and the application will launch on port 3000.

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server/index.js`
-   Change the `apiPort` or `apiUrl` values in `src/renderer.tsx`
-   Change the `websitePort` or `websiteDomain` values in `api-server/index.js`
-   Change the `websitePort` or `websiteUrl` values in `src/renderer.tsx`
-   Change the value for `port` for the config of `"@electron-forge/plugin-webpack"` in `package.json`. This port is used to start the webserver.

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server/index.js` file.

## Things to note

-   This example app runs a React app with Electron using `HashRouter` from `react-router-dom`
-   Electron handles cookies and calls to the Window API in a different way. To account for that, this example app passes custom cookie and window handlers when calling `SuperTokens.init` in `src/renderer.tsx`. You can find the logic for custom handling in `src/cookieHandler.ts` and `src/windowHandler.ts`.
-   This example app uses `supertokens-demo` as a registered protocol to handle deeplinking for passwordless login with Magic Links. You can change this protocol by changing the value of `deeplinkProtocol` in `src/renderer.tsx` and `api-server/index.js`.
-   For redirection after social login, the app uses the `apiDomain` for redirect urls, this is because social providers do not support `HashRouter` and do not allow file protocol URLs. As a workaround the `api-server/index.js` contains two routes `/auth/callback/:providerId` and `/auth/verify` that redirect to the app using the registered protocol mentioned above
-   For emails sent for passwordless login with magic links, the link is modified to use the `apiDomain`. This is because Electron uses the file protocol for production builds which affects routing. The `/auth/verify` route internally redirects to the app using the registered protocol mentioned above.

## Production builds

```bash
npm run package
```

This will generate an application in the `out` directory.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
