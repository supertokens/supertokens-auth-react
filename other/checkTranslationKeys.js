const { promises: fs } = require("fs");
const path = require("path");

// from https://gist.github.com/lovasoa/8691344
async function* walk(rootPath) {
    for await (const dir of await fs.opendir(rootPath)) {
        const entry = path.join(rootPath, dir.name);
        if (dir.isDirectory()) yield* await walk(entry);
        else if (dir.isFile()) yield entry;
    }
}

async function checkTranslationKeys() {
    const translationKeys = new Set();
    for await (const p of walk(path.join(__dirname, "..", "lib", "build"))) {
        if (p.endsWith("translations.js")) {
            const mod = require(p);
            for (const exportKey of Object.keys(mod)) {
                for (const key of Object.keys(mod[exportKey].en)) {
                    if (mod[exportKey].en[key] !== undefined) {
                        translationKeys.add(key);
                    }
                }
            }
        }
    }

    const unusedKeys = new Set(translationKeys);
    const missingKeys = [];

    for await (const p of walk(path.join(__dirname, "..", "lib", "build"))) {
        if (p.endsWith(".js") && !p.endsWith("translations.js")) {
            const contents = await fs.readFile(p);
            for (const key of translationKeys) {
                if (contents.includes(key)) {
                    unusedKeys.delete(key);
                }
            }
            let call;
            const callRegex = /\st\("(\w+)"\)\s/g;
            while ((call = callRegex.exec(contents)) !== null) {
                if (!translationKeys.has(call[1])) {
                    missingKeys.push(call[1]);
                }
            }
        }
    }

    if (unusedKeys.size !== 0 || missingKeys.length !== 0) {
        console.log(
            "Unused translation keys: " +
                Array.from(unusedKeys)
                    .map((k) => `"${k}"`)
                    .join(", ")
        );
        console.log("Missing translation keys: " + missingKeys.map((k) => `"${k}"`).join(", "));
        process.exit(1);
    }
}

checkTranslationKeys();
