import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import fs from 'fs';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

const package_json = JSON.parse(fs.readFileSync('./package.json').toString());

process.env.VITE_APP_VERSION = package_json.version;
process.env.VITE_APP_COMPILED_DATE = new Date().toUTCString();

const is_prod = process.env.NODE_ENV === 'production';
console.log(is_prod ? 'Production mode' : 'Development mode');

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools()
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		rollupOptions: {
			output: {
				// filenames become hashes only when building for production but remain readable in dev mode
				entryFileNames: is_prod ? 'infonet-getfucked-[hash:15].js' : '[name]-[hash].js',
				chunkFileNames: is_prod ? 'infonet-getfucked-[hash:15].js' : '[name]-[hash].js', // "[name]-[hash].js"
				assetFileNames: is_prod ? 'infonet-getfucked-[hash:15][extname]' : '[name]-[hash][extname]' // assets/[name]-[hash][extname]
			}
		}
	}
});
