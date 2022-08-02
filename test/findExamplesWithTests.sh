matrixEntries=""
delim="{examplePath: "
while IFS=  read -r -d $'\0'; do
    matrixEntries+=$delim\"$(echo "$REPLY" | sed 's/\/test$//' )\""}";       # or however you want to process each file
    delim=", "$delim
done < <(find ./examples -name node_modules -prune -or -path "*/test" -print0)

matrixEntries="[$matrixEntries]"
echo $matrixEntries
