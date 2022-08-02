testAbleExamples=""
delim="{examplePath: "
while IFS=  read -r -d $'\0'; do
    testAbleExamples+=$delim\"$(echo "$REPLY" | sed 's/\/test$//' )\";       # or however you want to process each file
    delim="}, "$delim
done < <(find ./examples -name node_modules -prune -or -path "*/test" -print0)

testAbleExamples="[$testAbleExamples]"
echo $testAbleExamples
