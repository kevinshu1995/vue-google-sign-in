import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            name,
            entry: resolve(__dirname, "src/lib/lib_main.ts"),
            fileName: (format: string) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["vue", "vue-jsx", "vue-demi"],
            output: {
                globals: {
                    vue: "Vue",
                    "vue-demi": "VueDemi",
                    "vue-jsx": "VueJsx",
                },
            },
        },
    },
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
    ],
    server: {
        port: 5173,
    },
    optimizeDeps: {
        exclude: ["vue-demi"],
    },
});

