tag=$1$(date '+%d-%m-%Y--%H-%M-%S')
git tag $tag
git push origin --tags