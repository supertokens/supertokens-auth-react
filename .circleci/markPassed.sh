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
echo "calling /frontend PATCH to make testing passed"
responseStatus=`curl -s -o $FILENAME -w "%{http_code}" -X PATCH \
    https://api.supertokens.io/0/frontend \
    -H 'Content-Type: application/json' \
    -H 'api-version: 0' \
    -d "{
        \"password\": \"$SUPERTOKENS_API_KEY\",
        \"version\":\"$version\",
        \"name\": \"auth-react\",
        \"testPassed\": true
    }"`
if [ $responseStatus -ne "200" ]
then
    echo "failed core PATCH API status code: $responseStatus. Exiting!"
    cat $FILENAME
    exit 1
fi