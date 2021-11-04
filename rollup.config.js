// rollup.config.js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/init.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
  },

  plugins: [
    nodeResolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectories: ["node_modules"],
      },
    }),
    terser(),
    commonjs(),
  ],
};
