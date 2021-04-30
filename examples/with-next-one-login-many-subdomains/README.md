# SuperTokens Example

This is an implementation of SuperTokens with Next.js where:
- `example.com:3000/auth` is used to sign in which takes the user to `example.com:3000` post sign in
- if the user signs in, they will be signed in to `example.com:3000` as well as to `a.example.com:3000`.
- If the user is not signed in and visits `a.example.com:3000`, then will be redirected to `example.com:3000/auth`

## Setup
- Run the command `yarn install` in this directory.
- Add the following to your hosts configs `/etc/hosts` to allow for multi tenancy locally:
```
127.0.0.1   example.com
127.0.0.1   a.example.com
```