# This script is used to initialise the dev env for this package.
# Depending on the node version being used, it will do slightly different actions 

# For Apple M1 chip, you will also have to add these to to your bash profile:
# export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# export PUPPETEER_EXECUTABLE_PATH=`which chromium`
# And run brew install chromium --no-quarantine

echo "Updating supertokens-web-js supertokens-website patch versions"
npm up supertokens-web-js supertokens-website

echo "Install in root"
npm i -d --force || exit $?

echo "Install in test server"
(cd ./test/server && npm i ) || exit $?

echo "Install in test frontend"
(cd ./examples/for-tests && npm i -d --force && npm run prep) || exit $? 

echo "Install in test frontend for react 16"
(cd ./examples/for-tests-react-16 && npm i -d --force && npm run prep) || exit $?

echo "Install in type check test project"
(cd ./test/with-typescript && npm i -d --force) || exit $?
