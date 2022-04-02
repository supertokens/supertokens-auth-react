#!/bin/bash

cd $1/node_modules;

rm -rf supertokens-auth-react
rm -rf supertokens-website
rm -rf supertokens-node
rm -rf react
rm -rf react-dom

ln -s ../../../../supertokens-node/ supertokens-node
ln -s ../../../../supertokens-website/ supertokens-website
ln -s ../../../../supertokens-auth-react/ supertokens-auth-react

ln -s ../../../node_modules/react react
ln -s ../../../node_modules/react-dom react-dom
