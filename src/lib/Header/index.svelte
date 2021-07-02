<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="header">
	<p class="title" class:active={$page.path === '/'}>
		<a sveltekit:prefetch href="/">blog.takurinton.com</a>
	</p>
	<p class="page" class:active={$page.path === '/about'}>
		<a sveltekit:prefetch href="/external">External</a>
	</p>
</div>

<style lang="scss">
	$theme_main: #7fd5ea;
	$main-text: #222222;
	$theme_line: #a8a8a8;
	$sub-text: #707070;
	$heading: rgba(0, 0, 0, 0.7);

	$button_color: #ff69b4;

	$primary: #ff69b4;
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
			color: $heading;
			text-decoration: none;
			font-size: $h4;
			font-weight: $thick;
			&:hover {
				color: $primary;
			}
		}
	}

	.page {
		float: right;
		line-height: 43px;
		padding-right: 20px;
		a {
			color: $heading;
			text-decoration: none;
			font-size: $h5;
			font-weight: $thick;
			&:hover {
				color: $primary;
			}
		}
	}

	.title > li,
	.page > li {
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
