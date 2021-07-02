<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import marked from 'marked';
	import { syntaxHighlight, markdownStyle } from './utils';

	import { client } from '../../lib/graphql/client';
	import { POST_QUERY } from '../../lib/graphql/query';

	export const prerender = true;

	export const load: Load = async ({ page }) => {
		const id: number = Number(page.params.id);
		const res = await client.query({
			query: POST_QUERY, 
			variables: { id }
		})

		let post = res.data.getPost;
		syntaxHighlight();
		const r: marked.Renderer = markdownStyle();
		return {
		  props: { 
			post: { 
			  ...post, 
			  contents: marked(post.contents, { renderer: r }) 
			}
		  }
		};
	};
</script>

<script lang="ts">
	type Post = {
		__typename: string; 
		id: number;
		title: string;
		contents: string;
		pub_date: string;
	};

	export let post: Post;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/atom-one-dark-reasonable.min.css"
	/>
	<title>{post.title} | たくりんとんのブログ</title>
	<meta property="og:url" content="https://blog.takurinton.com/post/{post.id}" />
	<meta property="og:title" content="{post.title} | たくりんとんのブログ" />
	<meta property="og:description" content="たくりんとんのブログです" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/dtapptgdd/image/upload/w_1000/l_text:Sawarabi Gothic_70_bold:{post.title}/v1624689828/blog.takurinton.com_r14tz5.png"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://blog.takurinton.com/post/{post.id}/" />
	<meta property="twitter:title" content="{post.title} | たくりんとんのブログ" />
	<meta property="twitter:description" content="たくりんとんのブログです" />
	<meta
		property="twitter:image"
		content="https://res.cloudinary.com/dtapptgdd/image/upload/w_1000/l_text:Sawarabi Gothic_70_bold:{post.title}/v1624689828/blog.takurinton.com_r14tz5.png"
	/>
</svelte:head>

<section>
	<h1 class="title">{post.title}</h1>
	<p class="pub-date">{post.pub_date.slice(0, 10)}</p>
	<div class="contents">{@html post.contents}</div>
</section>

<style lang="scss">
	@import '../../app.scss';

	.title {
		text-align: center;
		font-size: $h3;
		font-weight: 800;
	}

	.pub-date {
		font-size: $p;
		text-align: right;
	}

	.contents {
		margin: 3% auto 5%;
		text-align: left;
		width: 80%;
		
		@media (max-width: 1024px) {
			width: 90%;
		}

		@media screen and (max-width: 500px) {
			.h1 {
				font-size: 1.6rem;
			}
			.h2 {
				font-size: 1.3rem;
			}
			img {
				width: 80%;
			}

			ul {
				margin-left: 3%;
			}
		}
	}
</style>
