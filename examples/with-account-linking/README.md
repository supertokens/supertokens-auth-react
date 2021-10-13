# Account linking example

This example app uses the `thirdpartyemailpassword` recipe and adds the feature of automatic account linking on user sign up. For example, if a user signs up with gmail using `user@gmail.com` and then signs up again with the same email, but using email & password, we will not create a new user. Instead, we will use the same userId across all login methods that use the same email.

## How to run & test

1. Run `yarn install`
2. Run `npm run build && npm run start`
3. Open `http://localhost:3000` on your browser
4. Sign up with google, note down the userId post login, and logout
5. Sign up with email & password using the same email as your google one, and post login, you will see that the userId is the same as in step (4).

## How the modification works

-   The frontend code (inside the `src` folder) is straightforward and no modified. It follows the [quick setup guide](https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend).

-   In the API (`api` folder), we use the [function `override` feature](https://supertokens.io/docs/thirdpartyemailpassword/advanced-customizations/backend-functions-override/about) to customize how the recipe behaves. This can be seen in `api/index.js`, in the `ThirdPartyEmailPassword.init` function call.

-   All the customization logic can be found in the `api/override.js` file. We need to maintain two data structures to enable account linking:

    -   A map from email ID to the [`User` object](https://supertokens.io/docs/nodejs/thirdpartyemailpassword/override/functions#supporting-types). Whenever we need to return a `User` object from any of the functions, we will use this map. The variable for this map in `override.js` is called `emailToUserMap`.
    -   A map from SuperTokens userId to your custom userId. Several SuperTokens userIds can map to the same custom userId. The custom userId is assigned in the `User` object in the `emailToUserMap` map. The variable for this in `override.js` is called `supertokensUserIdToCustomUserIdMap`.

-   Read the comments in the `override.js` file to understand the code.

## How to store the data structures

For this example, we store the required maps in memory (as JS objects). However, you will want to use a database for this and replace the queries to the maps we have with database queries.

You will also want to change how custom userIds are generated to make them globally unique. We recommend using UUIDs, but you can also use an auto increment or ID column from your db.

## Drawbacks of this modification:

-   Automatic account linking is not advisable from a security point of view. Let's take an example:

    -   In this demo app, we have sign in with google and with github.
    -   A user signs up with google to use this app.
    -   They also have their person github account that uses their gmail ID.
    -   If their github account is somehow compromised, then the attacker can then sign up to this app with their github account and then access this user's account.

    Hence, by doing automatic account linking, we are increasing the attack surface for account takeover. Instead, we recommend that if a user is signing up with another provider but with the same email, we can ask them to login with their original provider instead, or then to proceed with new account creation.

-   The current implementation has some loss of information. With this implementation, when we query supertokens to get a user based on a custom userId, we get only one of the mapped users, and not all of them. This can be solved by saving the `ogImpl` instance in memory and using that directly to get user info based on supertokens' userId.
