# Getting Started with Create React App

## Setup

-   Run the command `npm i -d` in the `with-one-login-many-subdomains` directory.
-   Add the following to your hosts configs `/etc/hosts` to allow for multi tenancy locally:

```
127.0.0.1   example.com
127.0.0.1   tenant1.example.com
127.0.0.1   tenant2.example.com
127.0.0.1   tenant3.example.com
```

## Available Scripts

In the project directory, you can run:

### `npm i && npm start`

Runs the app in the development mode.
Open [http://example:3000](http://example:3000) to view it in the browser.

### `node tenant-setup.mjs`

This will add the tenants used above to your core instance
