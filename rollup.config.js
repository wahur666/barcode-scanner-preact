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
        format: "esm"
    },{
        file: "dist/index.min.js",
        format: "esm",
        compact: true,
        plugins: [terser()]
    }],
    external: [
    ],
    plugins: [typescript(), nodeResolve()]
}

export default config;
