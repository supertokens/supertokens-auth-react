const { rollup } = require("rollup");
const typescript = require("rollup-plugin-typescript2");
const multiEntry = require("@rollup/plugin-multi-entry");

const { promises: fs } = require("fs");
const path = require("path");
const { Module } = require("module");
const { runInNewContext } = require("vm");

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

    const bundle = await rollup({
        input: path.join(__dirname, "..", "lib", "ts", "**", "translations.ts"),
        plugins: [
            typescript({
                tsconfig: "./lib/tsconfig_dev.json",
                check: false,
                tsconfigOverride: { compilerOptions: { declaration: false } },
            }),
            multiEntry(),
        ],
    });

    const generatedBundle = await bundle.generate({
        format: "cjs",
    });

    const p = "/inMemory.js";
    const contextModule = new Module(p, require.main);

    contextModule.require = Module.createRequire(p);
    contextModule.filename = path.basename(p);
    contextModule.path = path.dirname(p);

    runInNewContext(
        generatedBundle.output[0].code,
        {
            exports: contextModule.exports,
            require: contextModule.require,
            module: contextModule,
            __filename: contextModule.filename,
            __dirname: contextModule.path,
        },
        {
            filename: contextModule.filename,
        }
    );

    const mod = contextModule.exports;

    for (const exportKey of Object.keys(mod)) {
        for (const key of Object.keys(mod[exportKey].en)) {
            if (mod[exportKey].en[key] !== undefined) {
                translationKeys.add(key);
            }
        }
    }

    const unusedKeys = new Set(translationKeys);
    const missingKeys = [];

    for await (const p of walk(path.join(__dirname, "..", "lib", "ts"))) {
        if (p.match(/\.tsx?$/) && !p.endsWith("translations.ts")) {
            const contents = await fs.readFile(p);
            for (const key of translationKeys) {
                if (contents.includes(key)) {
                    unusedKeys.delete(key);
                }
            }
            let call;
            const callRegex = /\Wt\("(\w+)"\)/g;
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
