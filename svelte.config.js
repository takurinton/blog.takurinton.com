import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ scss: true }),

	kit: {
		target: '#svelte',
		adapter: vercel()
	}
};

export default config;
