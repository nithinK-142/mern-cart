const { build } = require("esbuild");
const dependencies = require("./package.json").dependencies;
const peerDependencies = require("./package.json").peerDependencies || {};
const { Generator } = require("npm-dts");

new Generator({
  entry: "src/index.ts",
  output: "build/index.d.ts",
}).generate();

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
  ...sharedConfig,
  platform: "node", // for CJS
  outfile: "build/index.js",
});

build({
  ...sharedConfig,
  outfile: "build/index.esm.js",
  platform: "neutral", // for ESM
  format: "esm",
});
