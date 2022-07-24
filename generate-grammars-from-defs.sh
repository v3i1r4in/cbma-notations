
requires=""
exports="module.exports={"
mkdir -p grammars
for filepath in grammar-definitions/*; do
    filename="${filepath##*/}"
    filename="${filename%.*}"

    echo "compiling $filename"
    npx nearleyc $filepath > "grammars/$filename.js"

    requires="${requires}\nconst $filename=require('./$filename');";
    exports="$exports\n  $filename,";

done
exports="$exports\n};"
echo "$requires\n\n$exports" > "grammars/index.js"