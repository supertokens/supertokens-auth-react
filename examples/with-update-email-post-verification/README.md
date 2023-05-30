![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens update email post verification after login

This demo app demonstrates how we can implement change in a user's email password account's email in such a way that the email change requires the user to go through the email verification flow.

In case the user is unable to complete the email verification flow, their account's email is not changed. We also prevent the user to change their email to that which belongs to another account.

If a user has verified multiple emails during the course of changing their email multiple times, if they further choose to change their email to an already verified email, then it won't ask them to verify the email again.

This demo app uses SuperTokens' pre built UI in a react app with a node JS, express backend. These changes more or less apply to custom UI apps as well.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-update-email-post-verification
npm install
cd frontend && npm install
cd backend && npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start the frontend app on `http://localhost:3000` and the backend app on `http://localhost:3001`.

Once you login / sign up, you will see a change email input option.

## How it works

TODO

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
