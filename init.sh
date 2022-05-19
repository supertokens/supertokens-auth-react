# This script is used to initialise the dev env for this package.
# Depending on the node version being used, it will do slightly different actions 

# For Apple M1 chip, you will also have to add these to to your bash profile:
# export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# export PUPPETEER_EXECUTABLE_PATH=`which chromium`
# And run brew install chromium --no-quarantine

npm i -d --force && (cd ./test/server && npm i ) && (cd ./examples/for-tests && npm i -d --force && npm run prep) && (cd ./examples/for-tests-react-16 && npm i -d --force --legacy-peer-deps && npm run prep) && (cd ./test/with-typescript && npm i -d --force)
