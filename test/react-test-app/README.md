

# Setup

1. `npm install`
2. `npm start`

Errors:
If you already have react-router-dom installed in the `supertokens-auth-react` package, both packages will clash, and you will see the following error:

`× Error: Invariant failed: You should not use <Route> outside a <Router>`.

Make sure to remove, or move the react-dom-router from `supertokens-auth-react` while you are using the test-app.

`mv node_modules/react-router-dom node_modules/react-router-dom-test`


And move it back if you are working on the main package:

`mv node_modules/react-router-dom-test node_modules/react-router-dom`