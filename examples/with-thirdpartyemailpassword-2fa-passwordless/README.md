![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens ThirdPartyEmailPassword + Passwordless 2fa demo

This demo app demonstrates how we can implement sign in with third party providers or email password with email verification and then add SMS OTP based 2FA on top of that.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-thirdpartyemailpassword-2fa-passwordless
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start on `http://localhost:3000`

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server/index.ts`
-   Change the `apiPort` or `apiUrl` values in `src/App.tsx`
-   Change the `websitePort` or `websiteDomain` values in `api-server/index.ts`
-   Change the `websitePort` or `websiteUrl` values in `src/App.tsx`

## Sending emails and SMS

The demo app, by default sends email and SMS by contacting https://api.supertokens.com servers. The SMS sending via this service is rate limited. You can configure the demo app to use your own SMTP server and use your own Twilio account credentials. You can also override how the emails and SMS are sent to take full control of their design and how they are sent.

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server/index.ts` file.

## Production build

```bash
npm run build && npm run start
```

## Current drawbacks:

-   No way of passing on redirectToPath across the 2 factors.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
