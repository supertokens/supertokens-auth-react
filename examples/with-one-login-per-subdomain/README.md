# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

-   Run the command `npm i -d` in the `with-one-login-per-subdomain` directory.
-   Add the following to your hosts configs `/etc/hosts` to allow for multi tenancy locally

```
127.0.0.1   tenant1.example.com
127.0.0.1   tenant2.example.com
127.0.0.1   tenant3.example.com
```

## Available Scripts

In the project directory, you can run:

### `npm i && npm start`

Runs the app in the development mode.\
Open [http://a.example.com:3000](http://a.example.com:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `node tenant-setup.mjs`

This will add the tenants used above to your core instance
