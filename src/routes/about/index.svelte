<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
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
