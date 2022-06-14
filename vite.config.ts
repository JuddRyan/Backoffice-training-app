import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
// https://github.com/hannoeru/vite-plugin-pages
export default defineConfig({
	build: {
		target: 'esnext',
	},
	plugins: [
		react(),
		Pages({
			dirs: [
				{ dir: 'src/pages', baseRoute: '' }, // default route
				{ dir: 'src/admin', baseRoute: 'admin' }, // custom route
			],
		}),
	],
});
