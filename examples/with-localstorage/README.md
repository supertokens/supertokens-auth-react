![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Demo app - with-localstorage

This demo app shows you how to substitute frontend cookies storage with localstorage when using header based auth.

The main idea is that we provide a custom `cookieHandler` on the frontend's supertokens.init which will provide functions for getting and setting frontend cookies, but instead of writing to cookies, it will write to localstorage.

You can find the implementation of this custom handler in `/frontend/src/cookieHandler.ts`. The function `getCookieHandler` that is exposed by this file is used in `supertokens.init` in `/frontend/src/config.ts`.

You can start the demo app by running:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-localstorage

npm install

npm run start
```

Once you login into the demo app, then you will see that the cookie store on the frontend no longer has the session tokens, but if you open localstorage, you will see that all the tokens are under the key `frontendCookies`.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
