#!/bin/bash

#
# Methods.
#

# Exit script from startEndToEnd func.
trap "exit 1" TERM
export EXIT_PID=$$

apiPort=$1

function startFrontEnd () {
    (
        echo "Starting test example app"
        # go to test app.
        cd ./examples/for-tests/
        # Run static react app on PORT 3031.
        BROWSER=none PORT=3031 REACT_APP_API_PORT=$apiPort npm run start
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

    if [[ -z "${MOCHA_FILE}" ]]; then
        APP_SERVER=$apiPort TEST_MODE=testing mocha --require @babel/register --require test/test.mocha.env --timeout 40000
    else
        if ! [[ -z "${CIRCLE_NODE_TOTAL}" ]]; then
            export SPEC_FILES=$(npx mocha-split-tests -r ./runtime.log -t $CIRCLE_NODE_TOTAL -g $CIRCLE_NODE_INDEX -f 'test/end-to-end/**/*.test.js' -f 'test/unit/**/*.test.js')
            echo "Running files: $SPEC_FILES, $CIRCLE_NODE_TOTAL/$CIRCLE_NODE_INDEX"
        fi
        APP_SERVER=$apiPort TEST_MODE=testing multi="spec=- mocha-junit-reporter=/dev/null" mocha --reporter mocha-multi --require @babel/register --require test/test.mocha.env --timeout 40000 --no-config $SPEC_FILES
    fi
    testPassed=$?;
    if ! [[ -z "${CI}" ]]; then
        cp ../supertokens-root/logs/error.log test_report/logs/core_error.log
        cp ../supertokens-root/logs/info.log test_report/logs/core_info.log
    fi
    echo "testPassed exit code: $testPassed"
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

mkdir -p test_report/logs
# Run node server in background.
(cd test/server/ && TEST_MODE=testing INSTALL_PATH=../../../supertokens-root NODE_PORT=8082 node . >> ../../test_report/logs/backend.log 2>&1 &)

# Start front end test app and run tests.
startEndToEnd &
startFrontEnd >> test_report/logs/frontend.log 2>&1
exit 0
