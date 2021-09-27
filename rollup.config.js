// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/init.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  
  plugins: [nodeResolve({
    // pass custom options to the resolve plugin
    customResolveOptions: {
      moduleDirectories: ['node_modules']
    }
  }), terser()],
};