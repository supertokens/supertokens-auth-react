#!/bin/bash

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
        cd ./examples/for-tests/
        # Run static react app on PORT 3031.
        BROWSER=none PORT=3031 npm run start
    )
}

function killServers () {
    echo "Kill servers."
    lsof -i tcp:8082 | grep node | awk '{printf $2}' | cut -c 1- | xargs -I {} kill -9 {} > /dev/null 2>&1
    lsof -i tcp:3031 | grep node | awk '{printf $2}' | cut -c 1- | xargs -I {} kill -9 {} > /dev/null 2>&1
}

function startEndToEnd () {
    # Wait for the test app to be up before running tests.
    while ! curl -s localhost:3031 > /dev/null 2>&1
    do
        echo "Waiting for front end test application to start..."
        sleep 5
    done
    sleep 2 # Because the server is responding does not mean the app is ready. Let's wait another 5secs to make sure the app is up.
    echo "Start mocha testing"
    TEST_MODE=testing mocha --require @babel/register --timeout 15000
    testPassed=$?;
    echo "testPassed $testPassed"
    killServers
    if [[ $testPassed -ne 0 ]]
    then
        kill -s TERM $EXIT_PID
        return;
    fi

}

#
# Run.
#

trap "killServers" EXIT # Trap to execute on script shutdown


# Start by killing any servers up on 8082 and 3031 if any.
killServers

# Run node server in background.
(cd test/server/ && TEST_MODE=testing INSTALL_PATH=../../../supertokens-root NODE_PORT=8082 node . > /dev/null 2>&1 &)  

# Start front end test app and run tests.
startEndToEnd &
startFrontEnd > /dev/null 2>&1
exit 0
