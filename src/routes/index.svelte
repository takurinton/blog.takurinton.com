<script context="module" lang="ts">
	import { enhance } from '$lib/form';
	import type { Load } from '@sveltejs/kit';

	export const prerender = true;

	export const load: Load = async ({ page, fetch }) => {
		const category = page.query.get('category') ?? '';
		const pages = page.query.get('page') ?? '';
		let params = '';

		if (pages !== '' && category !== '') params = `?page=${pages}&category=${category}`;
		else if (pages === '' && category !== '') params = `?&category=${category}`;
		else if (pages !== '' && category === '') params = `?page=${pages}`;

		const res = await fetch(`/graphql/posts${params}`);

		if (res.ok) {
			const _posts = await res.json();
			const posts = _posts.data.getPosts;
			return {
				props: { posts }
			};
		}

		return {
			error: new Error('INTERNAL SERVER ERROR!!!')
		};
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	type Posts = {
        current: number;
        next: number;
        previous: number;
        category: string;
        results: Post[];
    }

	type Post = {
        __typename: string;
        id: number;
        title: string;
        contents: string;
        pub_date: Date;
    }

	export let posts: Posts;
	console.log(posts.previous, posts.current, posts.next)
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
				<p class="pubDate">{post.pub_date.slice(0, 10)}</p>
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
			color: $main-text;
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
			margin-top: 10px;
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
