import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'react-native': 'react-native-web',
            '@root': resolve(__dirname, "src"),
            '@components': resolve(__dirname, "src/components"),
            '@styles': resolve(__dirname, "src/styles"),
            '@services': resolve(__dirname, "src/services"),
            '@utils': resolve(__dirname, "src/utils"),
            '@hooks': resolve(__dirname, "src/hooks"),
            '@context': resolve(__dirname, "src/context"),
        },
    },
    define: {
        global: 'window'
    },
    build: {
        outDir: "../wwwroot/app/",
        sourcemap: true,
        emptyOutDir: true
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5163',
                changeOrigin: true
            },
            '/save': {
                target: 'http://localhost:5163', // Change this to your target server if different
                changeOrigin: true,
            },
            '/delete': {
                target: 'http://localhost:5163', // Change this to your target server if different
                changeOrigin: true,
            },
            '/auth': {
                target: 'http://localhost:5163', // Change this to your target server if different
                changeOrigin: true,
            },
        }
    },
    optimizeDeps: {
        exclude: ['js-big-decimal']
    }
});