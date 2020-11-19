#!/bin/bash

#
# Use.
#
# ./startTestApp => Start frontend test app
# ./startTestApp --test => Start frontend test app without building
# ./startTestApp --clean-up => Move back dependencies before running unit tests.
# 

#
# Methods.
#

# Exit script from startEndToEnd func.
trap "exit 1" TERM
export EXIT_PID=$$

function startFrontEnd () {
    (
        echo "Starting test example app"
        # go to test app.
        cd test/react-test-app/
        # Run static react app on PORT 3031.
        BROWSER=none PORT=3031 npm run start
    )
}

function mvClashingNodeModulesToTmp () {
    # Prevent clashes on react-router-dom, and react.
    echo "Move clashing node_modules to tmp."
    mv node_modules/react-dom node_modules/react-dom-tmp > /dev/null 2>&1
    mv node_modules/react-router-dom node_modules/react-router-dom-tmp > /dev/null 2>&1
    mv node_modules/react node_modules/react-tmp > /dev/null 2>&1
    mv node_modules/eslint node_modules/eslint-tmp > /dev/null 2>&1
}

function moveBackNodeModules () {
    echo "Adding back node_modules"
    mv node_modules/react-router-dom-tmp node_modules/react-router-dom > /dev/null 2>&1
    mv node_modules/react-dom-tmp node_modules/react-dom > /dev/null 2>&1
    mv node_modules/react-tmp node_modules/react > /dev/null 2>&1
    mv node_modules/eslint-tmp node_modules/eslint > /dev/null 2>&1
}

function cleanUp () {
    echo "Clean Up"
    moveBackNodeModules
    if [[ $mode == "--test" ]]; then
        echo "Kill servers."
        lsof -i tcp:8082 | grep node | awk '{printf $2}' | cut -c 1- | xargs -I {} kill -9 {} > /dev/null 2>&1
        lsof -i tcp:3031 | grep node | awk '{printf $2}' | cut -c 1- | xargs -I {} kill -9 {} > /dev/null 2>&1
    fi
}

function startEndToEnd () {
    # Wait for the test app to be up before running tests.
    while ! curl -s localhost:3031 > /dev/null 2>&1
    do
        echo "Waiting for front end test application to start..."
        sleep 5
    done
    sleep 2 # Because the server is responding does not mean the app is ready. Let's wait another 5secs to make sure the app is up.
    moveBackNodeModules
    echo "Start mocha testing"
    TEST_MODE=testing mocha --require @babel/register --timeout 20000
    testPassed=$?;
    echo "testPassed $testPassed"
    cleanUp
    if [[ $testPassed -ne 0 ]]
    then
        kill -s TERM $EXIT_PID
        return;
    fi

}

#
# Run.
#

mode=$1

if [[ $mode == "--clean-up" ]]; then
    cleanUp
    exit 0
fi

trap "cleanUp" EXIT # Trap to execute on script shutdown


if [[ $mode == "--test" ]]; then
    # Start by killing any servers up on 8082 and 3031 if any.
    cleanUp

    # Run node server in background.
    (cd test/server/ && TEST_MODE=testing INSTALL_PATH=../../../supertokens-root NODE_PORT=8082 node . > /dev/null 2>&1 &)  

    # Start front end test app and run tests.
    mvClashingNodeModulesToTmp
    startEndToEnd &
    startFrontEnd > /dev/null 2>&1
    exit 0
else
    mvClashingNodeModulesToTmp
    startFrontEnd # Start Front end.
fi
