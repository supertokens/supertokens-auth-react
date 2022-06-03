frontendDriverJson=`cat ../frontendDriverInterfaceSupported.json`
frontendDriverLength=`echo $frontendDriverJson | jq ".versions | length"`
frontendDriverArray=`echo $frontendDriverJson | jq ".versions"`

webInterfaceJson=`cat ../webJsInterfaceSupported.json`
webInterfaceVersion=`echo $webInterfaceJson | jq ".version"`
webInterfaceVersion=`echo $webInterfaceVersion | tr -d '"'`

# get sdk version
version=`cat ../package.json | grep -e '"version":'`
while IFS='"' read -ra ADDR; do
    counter=0
    for i in "${ADDR[@]}"; do
        if [ $counter == 3 ]
        then
            version=$i
        fi
        counter=$(($counter+1))
    done
done <<< "$version"
FILENAME=$(mktemp)
responseStatus=`curl -o $FILENAME -w "%{http_code}" -X PUT \
    https://api.supertokens.io/0/frontend \
    -H 'Content-Type: application/json' \
    -H 'api-version: 1' \
    -d "{
        \"password\": \"$SUPERTOKENS_API_KEY\",
        \"version\":\"$version\",
        \"name\": \"auth-react\",
        \"frontendDriverInterfaces\": $frontendDriverArray,
        \"webJsInterface\": \"$webInterfaceVersion\"
    }"`
if [ $responseStatus -ne "200" ]
then
    echo "failed core PUT API status code: $responseStatus. Exiting!"
    cat $FILENAME
	exit 1
fi