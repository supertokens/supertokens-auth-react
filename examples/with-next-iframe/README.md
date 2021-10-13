# SuperTokens Example

## Project Setup:

Install the project dependencies:

```bash
yarn install
```

Start ngrok and expose port `3000`

```bash
ngrok http 3000
```

## Run the demo app

-   Put the https domain of ngrok in `config/supertokensConfig.js`

-   Build and serve the Next app.

    ```bash
    npm run dev
    ```

-   In chrome > settings > privacy > cookies > check block third party cookies in incognito
-   Open chrome incognito on `http://localhost:3000/iframe`

### IMPORTANT: This example currently doesn't work on incognito chrome and safari due to their third party cookie blocking rules. You can fix this by making use of localstorage instead of cookies. Here is a [guide](https://supertokens.io/recipe-redirect?to=/advanced-customizations/examples/localstorage/about) on how to do it.

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at SuperTokens.io.

## License

This project is licensed under the Apache 2.0 license.
