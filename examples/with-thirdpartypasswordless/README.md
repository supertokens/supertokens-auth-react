![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Passwordless (email or phone number) + Social login Demo app

This demo app demonstrates the following use cases:

-   Social Login / Sign up
-   Login / sign up using OTP or magic link
-   Logout
-   Session management & Calling APIs

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Sending emails and SMS

The demo app, by default sends email and SMS by contacting https://api.supertokens.com servers. The SMS sending via this service is rate limited. You can configure the demo app to use your own SMTP server and use your own Twilio account credentials. You can also override how the emails and SMS are sent to take full control of their design and how they are sent.

## Set environment variables

The demo app contains code for seding emails to the user for passwordless auth. You need to set the following environment variables for the email user before running the demo app:

```bash
NODEMAILER_USER
NODEMAILER_PASSWORD
```

You can do this by:

-   Editing the `api-server/.env.example` file
-   Rename the `api-server/.env.example` file to `.env`

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

If you would like to modify the website (http://localhost:3000) or the API server (http://localhost:3001) URL:

-   Change the `apiPort` or `apiDomain` values in `api-server/index.js`
-   Change the `apiPort` or `apiUrl` values in `src/App.js`
-   Change the `websitePort` or `websiteDomain` values in `api-server/index.js`
-   Change the `websitePort` or `websiteUrl` values in `src/App.js`

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api-server/index.js` file.

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
