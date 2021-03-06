<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { client } from '../lib/graphql/client';
	import { POSTS_QUERY } from '../lib/graphql/query';
	import { datetimeFormatter } from '../lib/datetimeFormatter/datetimeFormatter';

	export const prerender = true;

	export const load: Load = async ({ page }) => {
		const category = page.query.get('category') ?? '';
		const pages = page.query.get('page') ?? 1;

		const res = await client.query({
			query: POSTS_QUERY,
			variables: { pages, category }
		});

		const posts = res.data.getPosts;
		return {
			props: { posts }
		};
	};
</script>

<script lang="ts">
	type Posts = {
		current: number;
		next: number;
		previous: number;
		category: string;
		results: Post[];
	};

	type Post = {
		__typename: string;
		id: number;
		title: string;
		contents: string;
		category: string;
		pub_date: string;
	};

	export let posts: Posts;
</script>

<svelte:head>
	<title>たくりんとんのブログ</title>
	<meta property="og:url" content="https://blog.takurinton.com/" />
	<meta property="og:title" content="Home | たくりんとんのブログ" />
	<meta property="og:description" content="たくりんとんのブログです" />
	<meta property="og:image" content="https://www.takurinton.com/me.jpeg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://blog.takurinton.com/" />
	<meta property="twitter:title" content="Home | たくりんとんのブログ" />
	<meta property="twitter:description" content="たくりんとんのブログです" />
	<meta property="twitter:image" content="https://www.takurinton.com/me.jpeg" />
</svelte:head>

<section>
	<h1>たくりんとんのブログ</h1>

	{#if posts.category !== ''}
		<h2>{posts.category} の記事一覧</h2>
	{/if}

	{#each posts.results as post}
		<div class="box">
			<div class="content">
				<a href="/post/{post.id}">
					<h1>{post.title}</h1>
				</a>
				<a class="category" href="/?category={post.category}">
					{post.category}
				</a>
				<p class="pubDate">{datetimeFormatter(post.pub_date)}</p>
				<p>{post.contents}</p>
			</div>

			<hr />
		</div>
	{/each}

	<div class="pagination">
		{#if posts.category !== ''}
			{#if posts.next !== posts.current}
				<a class="next-button" href="/?page={posts.next}&category={posts.category}">むかし</a>
			{/if}
			{#if posts.previous !== posts.current}
				<a class="prev-button" href="/?page={posts.previous}&category={posts.category}">さいきん</a>
			{/if}
		{:else}
			{#if posts.next !== posts.current}
				<a class="next-button" href="/?page={posts.next}">むかし</a>
			{/if}
			{#if posts.previous !== posts.current}
				<a class="prev-button" href="/?page={posts.previous}">さいきん</a>
			{/if}
		{/if}
	</div>
</section>

<style lang="scss">
	@import '../app.scss';

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.box {
		margin: 0 auto;
		padding: 20px 5% 10px;
		width: 80%;
		text-align: left;
		line-height: 2;

		h1 {
			font-size: $h3;
			margin-bottom: 0;
			&:hover {
				color: $primary;
			}
		}

		@media (max-width: 1024px) {
			width: auto;
		}

		img {
			width: 80%;
		}

		a {
			font-size: $h5;
			color: $main-text;
			font-weight: $thick;
			text-decoration: none;
		}

		.category {
			padding: 3px 8px 4px;
			background: $sub-text;
			color: white;
			border-radius: 2px;
			&:hover {
				background: $primary;
			}
		}

		p {
			font-size: $p;
			font-weight: $nomal;
			color: $main-text;
		}

		.pubDate {
			font-weight: $nomal;
		}

		.pagination {
			margin: 20px auto 10%;
			position: relative;
			width: 80%;
			@media (max-width: 800px) {
				.pagination {
					width: 70%;
				}
			}
			@media (max-width: 500) {
				.pagination {
					width: 90%;
				}
			}
		}
	}

	.next-button,
	.prev-button {
		padding: 5px 10px 7px;
		position: absolute;
		font-weight: $thick;
		text-decoration: none;
		font-size: $h4;
		font-weight: $thick;
		background: $sub-text;
		color: white;
		border-radius: 4px;
		&:hover {
			background: $primary;
		}
	}
	.next-button {
		right: 10%;
	}
	.prev-button {
		left: 10%;
	}
</style>
