
function startTestApp () {
    (
        echo "LOGS: Starting test example app"
        # go to test app.
        cd test/react-test-app/
        # Run static react app on PORT 3031.
        BROWSER=none PORT=3031 npm run start
    )
}

function mvClashingNodeModulesToTmp () {
    # Prevent clashes on react-router-dom, and react.
    echo "LOGS: Move clashing node_modules to tmp."
    mv node_modules/react-router-dom node_modules/react-router-dom-tmp
    mv node_modules/react node_modules/react-tmp
}

function resetNodeModules () {
    echo "LOGS: Adding back node_modules/react-router-dom"
    mv node_modules/react-router-dom-tmp node_modules/react-router-dom
    mv node_modules/react-tmp node_modules/react
}

trap "resetNodeModules" EXIT # Trap to execute on script shutdown (by user or killed by tests)

# Start test app.
if [[ $1 == "--test" ]]; then
    mvClashingNodeModulesToTmp
    startTestApp
fi


if [[ $1 == "--start" ]]; then
    # Build if --no-build is not present.
    if [[ $2 != "--no-build" ]]; then
        npm run build-pretty
    fi

    mvClashingNodeModulesToTmp
    startTestApp
fi
    