<script context="module" lang="ts">
	import { enhance } from '$lib/form';
    import type { Load } from '@sveltejs/kit';
    import marked from 'marked';
    import highlightjs from 'highlight.js';
    
    export const prerender = true;

    const syntaxHighlight = () => {
        marked.setOptions({
            highlight: (code:string, lang:string) => {
                return highlightjs.highlightAuto(code, [lang]).value;
            },
        })
    }
    
    const markdownStyle = () => {
        const r = new marked.Renderer()
            r.heading = (text:string, level:number) => {
                return (
                    `<h${level} class="h${level}"">${text}</h${level}>`
                )
            }
            r.table = (header: string, body: string) => { 
                return (
                    `<table class="table" border="1" width="100%">
                        ${header}
                        ${body}
                    </table>`
                )
            }
            r.list = (body: string, ordered: boolean, start: number) => {
                return (
                    `
                    <ul>
                        ${body}
                    </ul>
                    `
                )
            }
            r.image = (href: string | null, title: string | null, text: string) => {
                return (
                    `
                    <img src=${href} class="content-img" />
                    `
                )
            }
            r.paragraph = (text: string) => {
                return (
                    `
                    <p class="p">${text}</p>
                    `
                )
            }
        return r
    }

    // getInitialProps 的なノリのやつ
    // page はページとかクエリパラメータとかを取得できる
    // 引数の fetch は node-fetch 的なやつ、鯖でも走るけど node-fetch 要らず
    // session や context なども持つことができる、hooks.ts でここら辺も設定できる
	export const load: Load = async ({ page, fetch }) => {
        const id: string = page.params.id;
		const res = await fetch(`https://api.takurinton.com/blog/v1/post/${id}`);
		if (res.ok) {
            const post = await res.json();
            syntaxHighlight()
            const r: marked.Renderer = markdownStyle();
            post.contents = marked(post.contents, { renderer: r });
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/atom-one-dark-reasonable.min.css">
    <title>{ post.title } | たくりんとんのブログ</title>
    <meta property="og:url" content="https://blog.takurinton.com/post/{post.id}" />
    <meta property="og:title" content="{post.title} | たくりんとんのブログ" /> 
    <meta property="og:description" content="たくりんとんのブログです" /> 
    <meta property="og:image" content="https://res.cloudinary.com/dtapptgdd/image/upload/w_1000/l_text:Sawarabi Gothic_70_bold:{post.title}/v1620370500/Screen_Shot_2021-05-07_at_15.54.47_extlvu.png" />
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://blog.takurinton.com/post/{post.id}/" />
    <meta property="twitter:title" content="{post.title} | たくりんとんのブログ" /> 
    <meta property="twitter:description" content="たくりんとんのブログです" /> 
    <meta property="twitter:image" content="https://res.cloudinary.com/dtapptgdd/image/upload/w_1000/l_text:Sawarabi Gothic_70_bold:{post.title}/v1620370500/Screen_Shot_2021-05-07_at_15.54.47_extlvu.png" />
</svelte:head>

<section>
    <h1 class="title">{ post.title }</h1>
    <div class="main">{ @html post.contents }</div>
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

.title {
    text-align: center;
    font-size: $h3;
    font-weight: 800;
}

.main {
    margin: 3% auto 5%;
    text-align: left;

    h1 {
        margin: 4% 0 1% 1%; 
        border-bottom: solid 2px $pink_kawaii; 
        width: 100%
    }
    h2 {
        border-bottom: solid 1.6px $pink_kawaii; 
    }
    h2, .h3, .h4, .h5, .h6 {
        margin: 10px 0 2px 2%;
    }
    p {
        line-height: 2.4; 
        margin-left: 4%;
        font-weight: 600;
    }
    
    a {
        text-decoration: none;
        color: $pink_kawaii;
    }
    
    
    ul {
        line-height: 2;
        margin-left: 2%;
        margin-bottom: 1%;
        font-weight: 600;
    }

    table {
        margin-left: 4%;
        width: auto;
    }
    
    table td {
        word-break : break-all;
    }
    
    .content-img { 
        margin: 30px 0 30px 4%;  
    }
    
    pre {
        padding: 10px;
        margin: 10px 0 10px 4%;
        overflow: auto;
        background-color: #2c2d3a;
        border-radius: 5px;
    }
    pre > code {
        font-weight: 500;
        color: white;
        font-family:"SFMono-Regular","Consolas","Liberation Mono","Menlo",monospace,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }

    code {
        font-weight: 500;
        color: black;
        font-family:"SFMono-Regular","Consolas","Liberation Mono","Menlo",monospace,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }
    
    @media (max-width: 1024px) {
        width: 90%;
    }

    @media screen and (max-width: 500px) {
        .h1 {
            font-size: 1.6rem
        }
        .h2 {
            font-size: 1.3rem
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