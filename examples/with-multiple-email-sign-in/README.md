![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens EmailPassword with multiple emails per user

This demo app demonstrates the following use cases:

-   Email & Password login with any email associated with a user
-   Reset password flow
-   Logout
-   Session management & Calling APIs
-   Allows a user to associated multiple emails with their account and make use of any of them to login
-   Email verification flow for all the associated emails.

## Explanation of the customization

-   We store a map that maps a primary email ID to a list of secondary email IDs. The primary email of a user is one that they used to first sign up. Note that this map needs to be created and managed by you in your own db.
-   We override the email password recipe functions on the backend make use of this map for all the functions whose input is an email ID. We take the input email and get the primary email associated with that email, and then call the original implementation. This way, a user can sign in with any of the emails associated with their account.
-   We override the email verification functions to run its logic by looping through all the emails associated with the user and not just the input email. This way, even if one of the emails associated with a user is unverified, they will be asked to verify it.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-multiple-email-sign-in
npm install
```

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
