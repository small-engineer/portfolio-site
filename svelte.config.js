import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ typescript: true }),
	alias: {
		$lib: './src/lib',
		$components: './src/lib/components',
		$stores: './src/lib/stores',
		$utils: './src/lib/utils'
	},

	kit: {
		adapter: adapter()
	}
};

export default config;
