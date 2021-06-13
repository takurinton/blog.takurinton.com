<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import type { Load } from '@sveltejs/kit';
	import '../../app.scss';

	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;

	export const load: Load = async ({ page, fetch }) => {
		const res = await fetch('/external/rss.json');
		if (res.ok) {
			const rss = await res.json();
			return {
				props: { rss }
			};
		};
		
		return {
			error: new Error('INTERNAL SERVER ERROR')
		};
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	type rssType = {
	  title: string;
	  url: string;
	  date: string;
	};

	export let rss: rssType[];
</script>

<svelte:head>
	<title>About</title>
	<meta property="og:url" content="https://blog.takurinton.com/external/" />
	<meta property="og:title" content="外部記事 | たくりんとんのブログ" />
	<meta property="og:description" content="外部のサービスに投稿した記事一覧です" />
	<meta property="og:image" content="https://www.takurinton.com/me.jpeg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://blog.takurinton.com/external/" />
	<meta property="twitter:title" content="外部記事 | たくりんとんのブログ" />
	<meta property="twitter:description" content="外部のサービスに投稿した記事一覧です" />
	<meta property="twitter:image" content="https://www.takurinton.com/me.jpeg" />
</svelte:head>

<div class="content">
	<h1>外部に投稿した記事一覧</h1>
</div>

<style lang="scss">
	@import '../../app.scss';

	.content {
		width: 100%;
		max-width: $column_width;
		margin: $column_margin_top auto 0 auto;

		h1 {
			text-align: center;
		}
	}
</style>
