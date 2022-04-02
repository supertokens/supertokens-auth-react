frontendDriverJson=`cat ../frontendDriverInterfaceSupported.json`
frontendDriverArray=`echo $frontendDriverJson | jq ".versions"`

if [ -z "$SUPERTOKENS_API_KEY" ]; then
    echo "SUPERTOKENS_API_KEY missing"
    exit 1;
fi

sed -i -e 's/fdi-version: placeholder/fdi-version: '`printf "%q" $frontendDriverArray`'/' config_continue.yml 
