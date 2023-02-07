#!/bin/bash
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd $1;

npm i;

if [[ $? -ne 0 ]]
then
  printf "${RED}npm i failed${NC}\n"
  exit 1
fi
cd node_modules;

rm -rf supertokens-auth-react
rm -rf supertokens-website
rm -rf supertokens-web-js
rm -rf supertokens-node
rm -rf react
rm -rf react-dom

ln -s ../../../../supertokens-node/ supertokens-node
ln -s ../../../../supertokens-web-js/ supertokens-web-js
ln -s ../../../../supertokens-website/ supertokens-website
ln -s ../../../ supertokens-auth-react

ln -s ../../../node_modules/react react
ln -s ../../../node_modules/react-dom react-dom

cd @types

rm -rf @types/express

ln -s ../supertokens-node/node_modules/@types/express

cd ..

BROWSER=none SKIP_PREFLIGHT_CHECK=true npm start;