import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        // Temporarily disabled due to PHP version mismatch
        // wayfinder({
        //     formVariants: true,
        // }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@admin': path.resolve(
                __dirname,
                './packages/admin/resources/js'
            ),
            '@user': path.resolve(
                __dirname,
                './packages/user/resources/js'
            ),
            '@language': path.resolve(
                __dirname,
                './packages/language/resources/js',
            ),
            '@cms': path.resolve(
                __dirname,
                './packages/cms/resources/js',
            ),
        },
    },
});
