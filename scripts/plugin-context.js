const { rollup } = require("rollup");
const targetFolder = require("path").basename(__filename).replace(".js", "");
const { myPlugin } = require("./plugins/rollup-my-plugin");
const ts = require("@rollup/plugin-typescript");
/**
 * node api does not support array of input/output
 * see https://rollupjs.org/guide/en/#differences-to-the-javascript-api
 */
const outputOption = [
  {
    file: `dist/${targetFolder}/index.js`,
    format: "cjs",
    exports: "default",
  },
  {
    file: `dist/${targetFolder}/index.esm.js`,
    format: "esm",
  },
];

rollup({
  input: `./src/${targetFolder}/index.js`,
  plugins: [ts(), myPlugin()],
})
  .then(async (bundle) => {
    await Promise.all(
      outputOption.map(async (o) => {
        return await bundle.write(o);
      })
    );
    await bundle.close();
  })
  .then(() => {
    console.log("Done!");
  });
