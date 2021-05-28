<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="header">
		<p class="title" class:active={$page.path === '/'}><a sveltekit:prefetch href="/">blog.takurinton.com</a></p>
		<p class="page" class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About</a></p>
</div>

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

	.header {
    padding: 0 20% 10px;
    position: relative;
    vertical-align: middle;
    background: white;
	}

	.title {
		padding-left: 20px;
		float: left; 
		a {
			color: $theme_text;
			text-decoration: none;
			font-size: $h4;
			font-weight: $thick;
			&:hover {
				color: $pink_kawaii;
			}
		}
	}

	.page {
		float: right;
		line-height: 30px;
		padding-right: 20px;
		a {
			color: $theme_text;
			text-decoration: none;
			font-size: $h5;
			font-weight: $thick;
			&:hover {
				color: $pink_kawaii;
			}
		}
	}

	.title > li, .page > li {
		list-style: none;
	}

	@media (max-width: 800px) {
	.header {
		height: 100%;
	}

	.title, 
	.page {
		float: none;
		text-align: center;
	}

	.title {
		padding-left: 0;
	}

	.page {
		margin-top: 10px;
		padding-right: 0;
	}
}
</style>
