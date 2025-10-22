#!/bin/bash

set -e

echo "🔨 Building and installing SuperTokens Auth React library..."
echo

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
APP_DIR="$SCRIPT_DIR"

cd "$ROOT_DIR"

echo "📦 Building the library..."
npm run build

echo "✅ Library built successfully!"
echo

echo "📋 Packing the library..."
npm pack

echo "✅ Library packed successfully!"
echo

cd "$APP_DIR"

echo "🧹 Cleaning existing installation..."
rm -rf node_modules/.cache
rm -rf .next
rm -rf node_modules/supertokens-auth-react/lib || true
rm -rf node_modules/supertokens-auth-react/recipe || true

mkdir -p node_modules/supertokens-auth-react

echo "📂 Installing packed library..."
tar -xf "$ROOT_DIR"/supertokens-auth-react-*.tgz --strip-components=1 -C node_modules/supertokens-auth-react

rm "$ROOT_DIR"/supertokens-auth-react-*.tgz

echo "📦 Installing library dependencies..."
cd node_modules/supertokens-auth-react

npm i --force --omit=dev || exit $?

echo "🔗 Setting up symlinks..."
rm -rf node_modules/react 
rm -rf node_modules/.cache
rm -rf node_modules/supertokens-web-js || true
rm -rf node_modules/supertokens-website || true

if [ -d "$ROOT_DIR/node_modules/supertokens-web-js" ]; then
    ln -s "$ROOT_DIR/node_modules/supertokens-web-js" node_modules/supertokens-web-js
fi

if [ -d "$ROOT_DIR/node_modules/supertokens-website" ]; then
    ln -s "$ROOT_DIR/node_modules/supertokens-website" node_modules/supertokens-website
fi

echo
echo "✅ SuperTokens Auth React library has been built, packed, and installed!"
echo "🎉 You can now run 'npm run dev' to start the Next.js app with the local library."
