#!/bin/bash

# pack-unpack repo to simulate an install
npm pack

REPO=$(pwd)

cd $1

echo "Installing supertokens-auth-react"
echo "asdasdsa"
echo $(pwd)
rm -rf node_modules/.cache
rm -rf node_modules/supertokens-auth-react/lib || true
rm -rf node_modules/supertokens-auth-react/recipe || true
mkdir -p node_modules/supertokens-auth-react
tar -xf $REPO/supertokens-auth-react-*.tgz --strip-components=1 -C node_modules/supertokens-auth-react
rm $REPO/supertokens-auth-react-*.tgz

cd node_modules/supertokens-auth-react

# install prod dependencies only
npm i --force --omit=dev || exit $?

rm -rf node_modules/react # We need this because we do local install instead which doesn't take the parent dir into account
rm -rf node_modules/.cache
rm -rf node_modules/supertokens-web-js || true
rm -rf node_modules/supertokens-website || true

# We symlink the supertokens-web-js dep to ensure it's the same version (maybe linked locally)
ln -s $REPO/node_modules/supertokens-web-js node_modules/supertokens-web-js

# We symlink the supertokens-website dep to ensure it's the same version (maybe linked locally)
ln -s $REPO/node_modules/supertokens-website node_modules/supertokens-website

echo "$1 prepped."
