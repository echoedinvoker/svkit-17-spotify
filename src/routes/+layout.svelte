<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { Navigation, Header } from '$components';

	export let data: LayoutData;
	let scrollY = 0;
	let topbar: HTMLElement;

	$: user = data.user;
	$: opacity = topbar ? Math.min(scrollY / topbar.offsetHeight, 1) : 0;
</script>

<svelte:window bind:scrollY />

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		<div id="topbar" bind:this={topbar}>
			<div class="topbar-bg" style:background-color="var(--header-color)" style:opacity></div>
			<Header />
		</div>
		<main id="main-content" class:logged-in={user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		#content {
			flex: 1;
			#topbar {
				position: fixed;
				z-index: 100;
				width: 100%;
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
				.topbar-bg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					pointer-events: none;
					z-index: -1;
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(var(--header-height) + 30px);
				}
			}
		}
	}
</style>
