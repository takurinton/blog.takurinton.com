<script context="module" lang="ts">
	import { enhance } from '$lib/form';
	import type { Load } from '@sveltejs/kit';

	export const prerender = true;

    // getInitialProps 的なノリのやつ
    // page はページとかクエリパラメータとかを取得できる
    // 引数の fetch は node-fetch 的なやつ、鯖でも走るけど node-fetch 要らず
    // session や context なども持つことができる、hooks.ts でここら辺も設定できる
	export const load: Load = async ({ page, fetch }) => {
        const id: string = page.params.id;
		const res = await fetch(`https://api.takurinton.com/blog/v1/post/${id}`);
		if (res.ok) {
			const post = await res.json();
			return {
				props: { post }
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
    
	type Post = {
		id: number,
		title: string, 
		category: string,
		contents: string, 
		contents_image_url: string,
		pub_date: string,
		comment: CommentProps[]
	}

	export let post: Post;
</script>

<svelte:head>
	<title>{ post.title } | たくりんとんのブログ</title>
</svelte:head>

<section>
    <h1>{ post.title }</h1>
</section>