#!/bin/bash

set -e

echo "🔨 Building and installing SuperTokens Auth React library..."
echo

# Get the root directory (two levels up from this script)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
APP_DIR="$SCRIPT_DIR"

# Navigate to root directory
cd "$ROOT_DIR"

echo "📦 Building the library..."
# Build the library
npm run build

echo "✅ Library built successfully!"
echo

echo "📋 Packing the library..."
# Pack the library
npm pack

echo "✅ Library packed successfully!"
echo

# Navigate to the app directory  
cd "$APP_DIR"

echo "🧹 Cleaning existing installation..."
# Clean existing installation
rm -rf node_modules/.cache
rm -rf node_modules/supertokens-auth-react/lib || true
rm -rf node_modules/supertokens-auth-react/recipe || true

# Create the node_modules directory structure
mkdir -p node_modules/supertokens-auth-react

echo "📂 Installing packed library..."
# Extract the packed library
tar -xf "$ROOT_DIR"/supertokens-auth-react-*.tgz --strip-components=1 -C node_modules/supertokens-auth-react

# Clean up the packed file
rm "$ROOT_DIR"/supertokens-auth-react-*.tgz

echo "📦 Installing library dependencies..."
# Navigate to the installed library and install its dependencies
cd node_modules/supertokens-auth-react

# Install production dependencies only
npm i --force --omit=dev || exit $?

echo "🔗 Setting up symlinks..."
# Clean up conflicting dependencies
rm -rf node_modules/react # Remove react to avoid conflicts with parent
rm -rf node_modules/.cache
rm -rf node_modules/supertokens-web-js || true
rm -rf node_modules/supertokens-website || true

# Symlink the supertokens-web-js dep to ensure it's the same version
if [ -d "$ROOT_DIR/node_modules/supertokens-web-js" ]; then
    ln -s "$ROOT_DIR/node_modules/supertokens-web-js" node_modules/supertokens-web-js
fi

# Symlink the supertokens-website dep to ensure it's the same version  
if [ -d "$ROOT_DIR/node_modules/supertokens-website" ]; then
    ln -s "$ROOT_DIR/node_modules/supertokens-website" node_modules/supertokens-website
fi

echo
echo "✅ SuperTokens Auth React library has been built, packed, and installed!"
echo "🎉 You can now run 'npm run dev' to start the Next.js app with the local library."