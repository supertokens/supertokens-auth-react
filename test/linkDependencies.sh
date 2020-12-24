#!/bin/bash
dependencies=(
    react
    react-router
    react-router-dom
    eslint
)


for dependency in "${dependencies[@]}"
do
    (
        cd $1/node_modules/$dependency
        npm link
    )
    npm link $dependency
done