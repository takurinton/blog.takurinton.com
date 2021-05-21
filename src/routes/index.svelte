<script context="module" lang="ts">
	import { enhance } from '$lib/form';
	import type { Load } from '@sveltejs/kit';

	export const prerender = true;

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('https://api.takurinton.com/blog/v1/');

		if (res.ok) {
			const posts = await res.json();
			return {
				props: { posts }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	type Posts = {
		next: string | null, 
		previous: string | null, 
		total: number, 
		category: any,
		current: number, 
		results: Post[], 
		page_size: string, 
		first: string, 
		last: string
	}

	type Post = {
		id: number,
		title: string, 
		category: string,
		contents: string, 
		contents_image_url: string,
		pub_date: string,
		comment: CommentProps[]
	}

	export let posts: Posts;

</script>

<svelte:head>
	<title>たくりんとんのブログ</title>
</svelte:head>

<section>
	hello world

	{#each posts.results as post}
		<p><a href="/post/{post.id}">{post.title}</a></p>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
