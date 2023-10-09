#!/bin/bash

cd $1;
npm i;

if [ -d "frontend" ]; then
    pushd frontend;
    npm i;
    npm install git+https://github.com:supertokens/supertokens-auth-react.git#$GITHUB_SHA;
    popd;
else
    npm install git+https://github.com:supertokens/supertokens-auth-react.git#$GITHUB_SHA;
fi

if [ -d "backend" ]; then
    pushd backend;
    npm i;
    popd;
fi
