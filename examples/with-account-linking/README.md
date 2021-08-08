# Account linking example

This example app uses the `thirdpartyemailpassword` recipe and adds the feature of automatic account linking on user sign up. For example, if a user signs up with gmail using `user@gmail.com` and then signs up again with the same email, but using email & password, we will not create a new user. Instead, we will use the same userId across all login methods that use the same email.

## How to run & test

1. Run `yarn install`
2. Copy `.env.example` and rename it to `.env`
3. Add the Github and Google secrets to the `.env` file, so that it looks like this (below are all example values):

```
# Github
GITHUB_CLIENT_ID=325dsadkfjnk3
GITHUB_CLIENT_SECRET=52d734asdfoi3j98vshaivhod
# Google
GOOGLE_CLIENT_ID=32344485696-ghkrfsadgadsfasdfafowiho14333s.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=hK_o4jHasdvasS_asCdsadvgaoHz4

SKIP_PREFLIGHT_CHECK=true
```

4. Run `npm run start`
5. Open `http://localhost:3000` on your browser
6. Sign up with google, note down the userId post login, and logout
7. Sign up with email & password using the same email as your google one, and post login, you will see that the userId is the same as in step (6).

## How the modification works

-   The frontend code (inside the `src` folder) is straightforward and no modified. It follows the [quick setup guide](https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend).

-   In the API (`api` folder), we use the [function `override` feature](https://supertokens.io/docs/thirdpartyemailpassword/advanced-customizations/backend-functions-override/about) to customize how the recipe behaves. This can be seen in `api/index.js`, in the `ThirdPartyEmailPassword.init` function call.

-   All the customization logic can be found in the `api/override.js` file. We need to maintain two data structures to enable account linking:

    -   A map from email ID to the [`User` object](https://supertokens.io/docs/nodejs/thirdpartyemailpassword/override/functions#supporting-types). Whenever we need to return a `User` object from any of the functions, we will use this map. The variable for this map in `override.js` is called `emailToUserMap`.
    -   A map from SuperTokens userId to your custom userId. Several SuperTokens userIds can map to the same custom userId. The custom userId is assigned in the `User` object in the `emailToUserMap` map. The variable for this in `override.js` is called `supertokensUserIdToCustomUserIdMap`.

-   Read the comments in the `override.js` file to understand the code.

## How to store the data structures

TODO:

## Drawbacks of this modification:

TODO:
