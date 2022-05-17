![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# Supabase Intergration with SuperTokens Example

This Nextjs App contains EmailPassword and Social Login based Authentication through SuperTokens with an intergration with Supabase.

This demo app demonstrates the following:

-   EmailPassword Login with SuperTokens
-   Social Login with SuperTokens
-   Querying Supabase with an authenticated user to retrieve their information

## Supabase setup

-   You will need to setup a Supabase app and create a table which will contain a mapping between a user's email (retrieved from SuperTokens) to their userId.
-   You will also need to create a policy for this table to ensure that only the authenticated user is allowed to retrieve this information

## Setup

-   Use `yarn` to install the project dependencies
    Install the apps dependencies

    ```bash
    yarn install
    ```

-   Set your Supabase apps's URL, Key and JWT Signing Secret in the .env file. You can retrieve these config values from your Supabase Dashboard.

## Run the demo app

-   This compiles and serves the Next app on port 3000

    ```bash
    npm run dev
    ```

## Notes

-   Take a look at [SuperTokens documentation](https://supertokens.com/docs/community/introduction).
-   We have provided development OAuth keys for the various in build third party providers in the `.env` file. Feel free to use them for development purposes, but **please create your own keys for production use**.
