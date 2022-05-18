echo "Starting tests for FDI $1";

if [ -z "$SUPERTOKENS_API_KEY" ]; then
    echo "SUPERTOKENS_API_KEY not set"
    exit 1
fi

frontendDriverVersion=$1
frontendDriverVersion=`echo $frontendDriverVersion | tr -d '"'`

driverVersionXY=`curl -s -X GET \
"https://api.supertokens.io/0/frontend-driver-interface/dependency/driver/latest?password=$SUPERTOKENS_API_KEY&mode=DEV&version=$frontendDriverVersion&driverName=node" \
-H 'api-version: 0'`
if [[ `echo $driverVersionXY | jq .driver` == "null" ]]
then
    echo "fetching latest X.Y version for driver given frontend-driver-interface X.Y version: $frontendDriverVersion gave response: $driverVersionXY. Please make sure all relevant drivers have been pushed."
    exit 1
fi
driverVersionXY=$(echo $driverVersionXY | jq .driver | tr -d '"')
driverInfo=`curl -s -X GET \
"https://api.supertokens.io/0/driver/latest?password=$SUPERTOKENS_API_KEY&mode=DEV&version=$driverVersionXY&name=node" \
-H 'api-version: 0'`
if [[ `echo $driverInfo | jq .tag` == "null" ]]
then
    echo "fetching latest X.Y.Z version for driver, X.Y version: $driverVersionXY gave response: $driverInfo"
    exit 1
fi
driverTag=$(echo $driverInfo | jq .tag | tr -d '"')
driverVersion=$(echo $driverInfo | jq .version | tr -d '"')

git clone git@github.com:supertokens/supertokens-node.git
cd supertokens-node
git checkout $driverTag
coreDriverJson=`cat ./coreDriverInterfaceSupported.json`
coreDriverLength=`echo $coreDriverJson | jq ".versions | length"`
coreDriverArray=`echo $coreDriverJson | jq ".versions"`
coreDriverVersion=`echo $coreDriverArray | jq ". | last"`
coreDriverVersion=`echo $coreDriverVersion | tr -d '"'`
cd ../
rm -rf supertokens-node

coreFree=`curl -s -X GET \
    "https://api.supertokens.io/0/core-driver-interface/dependency/core/latest?password=$SUPERTOKENS_API_KEY&planType=FREE&mode=DEV&version=$coreDriverVersion" \
-H 'api-version: 0'`
if [[ `echo $coreFree | jq .core` == "null" ]]
then
    echo "fetching latest X.Y version for core given core-driver-interface X.Y version: $coreDriverVersion, planType: FREE gave response: $coreFree. Please make sure all relevant cores have been pushed."
    exit 1
fi
coreFree=$(echo $coreFree | jq .core | tr -d '"')
someTestsRan=true
tries=1
while [ $tries -le 3 ]
do
    tries=$(( $tries + 1 ))
    ./setupAndTestWithFreeCore.sh $coreFree $driverTag
    if [[ $? -ne 0 ]]
    then
        if [[ $tries -le 3 ]]
        then
            rm -rf ../../supertokens-root
            rm -rf ../test/server/node_modules/supertokens-node
            git checkout HEAD -- ../test/server/package.json
            echo "failed test.. retrying!"
        else
            echo "test failed... exiting!"
            exit 1
        fi
    else
        rm -rf ../../supertokens-root
        rm -rf ../test/server/node_modules/supertokens-node
        git checkout HEAD -- ../test/server/package.json
        break
    fi
done
