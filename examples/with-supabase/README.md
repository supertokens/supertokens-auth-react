# Supabase Intergration with SuperTokens Example

This Nextjs App contains EmailPassword and Social Login based Authentication through SuperTokens with an intergration with Supabase.

This demo app demonstrates the following:

-   EmailPassword Login with SuperTokens
-   Social Login with SuperTokens
-   Retrieving user_name data, for the authenticated user from Supabase

## TODO section

-   add section about what what the supabase app contains
-   link to the supabase blog post

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

-   Take a look at [SuperTokens documentation](https://supertokens.io/docs/community/introduction).
-   We have provided development OAuth keys for the various in build third party providers in the `.env` file. Feel free to use them for development purposes, but **please create your own keys for production use**.
