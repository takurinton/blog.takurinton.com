<script context="module" lang="ts">
	import { enhance } from '$lib/form';
	import type { Load } from '@sveltejs/kit';
	export const prerender = true;

	export const load: Load = async ({ page, fetch }) => {
		const category = page.query.get('category') ?? '';
		const pages = page.query.get('page') ?? '';
		let params ='';

		console.log(category)
		console.log(pages)

		if (pages !== '' && category !== '') params = `?page=${pages}&category=${category}`;
		else if (pages === '' && category !== '') params = `?&category=${category}`;
		else if (pages !== '' && category === '') params = `?page=${pages}`;

		const res = await fetch(`https://api.takurinton.com/blog/v1/${params}`);


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
	<meta property="og:url" content="https://blog.takurinton.com/" />
    <meta property="og:title" content="Home | たくりんとんのブログ" /> 
    <meta property="og:description" content="たくりんとんのブログです" /> 
    <meta property="og:image" content="https://www.takurinton.com/me.jpeg" />
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://blog.takurinton.com/" />
    <meta property="twitter:title" content="Home | たくりんとんのブログ" /> 
    <meta property="twitter:description" content="たくりんとんのブログです" /> 
    <meta property="twitter:image" content="https://www.takurinton.com/me.jpeg" />
</svelte:head>

<section>
	<h1>たくりんとんのブログ</h1>

	{#if posts.category !== null}
		<h2>{posts.category} の記事一覧</h2>
	{/if}

	{#each posts.results as post}
	<div class="box">
		<a href="/post/{ post.id }">
			<a>
			<div class="content">
				<h1>{post.title}</h1>
				<a href="/?category={ post.category }">
					<a class="category">
						{ post.category }
					</a>
				</a>
				<p class="pubDate">{ post.pub_date.slice(0, 10) }</p>
				<p>{ post.contents }</p>
			</div>
			</a>
		</a>
		<hr />
	</div>
	{/each}

	<div class="pagination">
		{#if posts.category !== null}
			{#if posts.next !== null}
				<a class="next-button" href="/?page={posts.next}&category={posts.category}">むかし</a>
			{/if}
			{#if posts.previous !== null}
				<a class="prev-button" href="/?page={posts.previous}&category={posts.category}">さいきん</a>
			{/if}
		{:else}
			{#if posts.next !== null}
					<a class="next-button" href="/?page={posts.next}">むかし</a>
			{/if}
			{#if posts.previous !== null}
				<a class="prev-button" href="/?page={posts.previous}">さいきん</a>
			{/if}
		{/if}
	</div>
</section>

<style lang="scss">

	$theme_main: #7fd5ea;
	$theme_text: #222222;
	$theme_line: #a8a8a8;
	$theme_subtext: #707070;

	$button_color: #FF69B4;

	$pink_kawaii: #FF69B4;
	$theme_back: #7fd5ea41;


	$h1: 4rem;
	$h2: 3.2rem;
	$h3: 2.4rem;
	$h4: 1.6rem;
	$h5: 1.2rem;
	$p: 1.2rem;

	$thin: 100;
	$thick: 800;
	$nomal: 500;

	$tablet: 800px; 
	$phone: 500px; 

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
    // box-shadow: 4px 4px 8px gray;
    width: 80%;
    text-align: left;
    line-height: 2;
    // background: linear-gradient(90deg, $theme_main 5%, white 5%);

    h1 {
        font-size: $h3;
        color: $theme_text;
        margin-bottom: 0;
        &:hover {
            color: $pink_kawaii;
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
        color: $theme_text; 
        font-weight: $thick;
        text-decoration: none;
    }

    .category {
        padding: 3px 8px 4px;
        background: $theme_subtext;
        color: white; 
        border-radius: 2px;
        &:hover {
            background: $pink_kawaii;
        }
    }

    p {
        font-size: $p; 
        font-weight: $nomal;
        color: $theme_text;
    }

    .pubDate {
        margin-top: 10px;
        font-weight: $nomal;
    }
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

.next-button, .prev-button {
    padding: 5px 10px 7px;
    position: absolute; 
    font-weight: $thick;
    text-decoration: none;
    font-size: $h4;
    font-weight: $thick;
    background: $theme_subtext;
    color: white;
    border-radius: 4px;
    &:hover {
        background: $pink_kawaii;
    }
}
.next-button {
    right: 0;
}
.prev-button {
    left: 0;
}
</style>
