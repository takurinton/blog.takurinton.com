<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import type { Load } from '@sveltejs/kit';
	import '../../app.scss';

	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/external/rss.json');
		if (res.ok) {
			const rss = await res.json();
			return {
				props: { rss }
			};
		}

		return {
			error: new Error('INTERNAL SERVER ERROR')
		};
	};
</script>

<script lang="ts">
	type rssType = {
		[key: string]: {
			title: string;
			url: string;
			content: string;
			date: string;
		}[];
	};

	export let rss: rssType;
</script>

<svelte:head>
	<title>External airticle</title>
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
	{#each rss.zenn as post}
		<div class="box">
			<div class="content">
				<a href={post.url}>
					<h1>
						<img src="https://simpleicons.org/icons/zenn.svg" alt={post.title} />
						{post.title}
					</h1>
				</a>
				<p>{post.content}</p>
			</div>
			<hr />
		</div>
	{/each}
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

		img {
			height: 28px;
			width: 28px;
		}
	}

	.box {
		h1 {
			font-size: $h3;
			color: $heading;
			margin-bottom: 0;
			&:hover {
				color: $primary;
			}
		}
	}
</style>
