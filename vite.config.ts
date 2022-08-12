import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
const pkg = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            name: pkg.name,
            entry: resolve(__dirname, "src/lib/lib_main.ts"),
            fileName: (format: string) => `vue-google-sign-in.${format}.js`,
        },
        rollupOptions: {
            external: ["vue", "vue-demi"],
            output: {
                globals: {
                    vue: "Vue",
                    "vue-demi": "VueDemi",
                },
            },
        },
    },
    plugins: [vue()],
    server: {
        port: 5173,
    },
    optimizeDeps: {
        exclude: ["vue-demi"],
    },
});
