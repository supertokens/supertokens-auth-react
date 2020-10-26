
function startTestApp () {
    (
        # go to test app.
        cd react-test-app/
        # Run static react app on PORT 3031.
        BROWSER=none PORT=3031 npm run start
    )
}

# Start test app.
if [[ $1 == "--start" ]]; then
    # Build if --no-build is not present.
    if [[ $2 != "--no-build" ]]; then
        npm run pretty
        npm run build
    fi
    echo "LOGS: Starting test example app"
    # Prevent clashes  on react-router-dom, and react.
    mv node_modules/react-router-dom node_modules/react-router-dom-tmp
    mv node_modules/react node_modules/react-tmp
    startTestApp
fi

# Add back react-router-dom on stop.
if [[ $1 == "--stop" ]]; then
    echo "LOGS: Adding back node_modules/react-router-dom"
    mv node_modules/react-router-dom-tmp node_modules/react-router-dom
    mv node_modules/react-tmp node_modules/react
fi