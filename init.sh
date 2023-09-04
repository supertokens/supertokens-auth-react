# This script is used to initialise the dev env for this package.
# Depending on the node version being used, it will do slightly different actions 

# For Apple M1 chip, you will also have to add these to to your bash profile:
# export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# export PUPPETEER_EXECUTABLE_PATH=`which chromium`
# And run brew install chromium --no-quarantine

echo "Install in root"
GIT_SSH_COMMAND="ssh" npm i -d --force || exit $?

echo "Install in test server"
(cd ./test/server && GIT_SSH_COMMAND="ssh" npm i ) || exit $?

echo "Install in test frontend"
(cd ./examples/for-tests && GIT_SSH_COMMAND="ssh" npm i -d --force && npm run prep) || exit $? 

echo "Install in test frontend for react 16"
(cd ./examples/for-tests-react-16 && GIT_SSH_COMMAND="ssh" npm i -d --force --legacy-peer-deps && npm run prep) || exit $?

echo "Install in type check test project"
(cd ./test/with-typescript && GIT_SSH_COMMAND="ssh" npm i -d --force) || exit $?
