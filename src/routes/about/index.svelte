<script context="module">
	import { browser, dev } from '$app/env';
	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
	<meta property="og:url" content="https://blog.takurinton.com/" />
    <meta property="og:title" content="About | たくりんとんのブログ" /> 
    <meta property="og:description" content="たくりんとんのブログです" /> 
    <meta property="og:image" content="https://www.takurinton.com/me.jpeg" />
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://blog.takurinton.com/" />
    <meta property="twitter:title" content="About | たくりんとんのブログ" /> 
    <meta property="twitter:description" content="たくりんとんのブログです" /> 
    <meta property="twitter:image" content="https://www.takurinton.com/me.jpeg" />
</svelte:head>

<div class="content">
	<h1>About me</h1>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
