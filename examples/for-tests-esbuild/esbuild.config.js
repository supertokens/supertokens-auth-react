// esbuild.config.js
require("esbuild").buildSync({
    entryPoints: ["src/app.tsx"],
    bundle: true,
    minify: true,
    format: "cjs",
    sourcemap: true,
    outfile: "dist/index.js",
});
