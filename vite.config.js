import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html")
            },
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "public/images/**/*", // Пусть к изображениям в папке public/images
                    dest: "images", // Куда копировать изображения в папке dist
                },
            ],
        }),
    ],
    assetsInclude: ['**/*.hbs, **/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'], 
})
