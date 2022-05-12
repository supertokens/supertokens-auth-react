# This script is used to initialise the dev env for this package.
# Depending on the node version being used, it will do slightly different actions 

# For Apple M1 chip, you will also have to add these to to your bash profile:
# export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# export PUPPETEER_EXECUTABLE_PATH=`which chromium`
# And run brew install chromium --no-quarantine

version=`node --version`

while IFS='.' read -ra ADDR; do
    counter=0
    for i in "${ADDR[@]}"; do
        if [ $counter == 0 ]
        then
            version=$i
        fi
        counter=$(($counter+1))
    done
done <<< "$version"
version="${version:1}" # here version will be something like v16. So we remove the v

if [ "$version" -gt "15" ]; then
    npm i -d --force && (cd ./test/server && npm i ) && (cd ./examples/for-tests && npm i -d --force && npm run link-node-16) && (cd ./examples/for-tests-react-16 && npm i -d --force --legacy-peer-deps && npm run link-node-16) && (cd ./test/with-typescript && npm i -d)
else
    node --version npm i -d && (cd ./test/server && npm i ) && (cd ./examples/for-tests && npm i -d && npm run link) && (cd ./examples/for-tests-react-16 && npm i -d --legacy-peer-deps && npm run link) && (cd ./test/with-typescript && npm i -d)
fi