import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {terser} from "rollup-plugin-terser";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: "src/index.tsx",
    output: [{
        file: "dist/index.js",
        format: "esm",
        sourcemap: true
    },{
        file: "dist/index.min.js",
        format: "esm",
        compact: true,
        sourcemap: true,
        plugins: [terser()]
    }],
    external: [
    ],
    plugins: [typescript(), nodeResolve()]
}

export default config;
