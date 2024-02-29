![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Demo app - with-hash-router

This demo app shows you how to use SuperTokens with a frontend router that uses hash routing. This example in particular uses [react-router-dom](https://reactrouter.com/web/guides/quick-start) with hash router.

The main idea is that we provide a custom `windowHandler` on the frontend's supertokens.init which will provide functions for getting the pathname, search and hash from the url.

You can find the implementation of this custom handler in `/frontend/src/windowHandler.ts`. The function `getWindowHandler` that is exposed by this file is used in `supertokens.init` in `/frontend/src/config.ts`.

You can start the demo app by running:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-hash-router

npm install

npm run start
```

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
