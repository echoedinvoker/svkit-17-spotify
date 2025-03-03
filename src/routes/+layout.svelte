<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { Navigation, Header } from '$components';
	import { page } from '$app/stores';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { hideAll } from 'tippy.js';

	NProgress.configure({ showSpinner: false });

	export let data: LayoutData;
	let scrollY = 0;
	let topbar: HTMLElement;

	$: user = data.user;
	$: opacity = topbar ? Math.min(scrollY / topbar.offsetHeight, 1) : 0;

	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
		hideAll();
	});
</script>

<svelte:window bind:scrollY />

<svlete:head>
	<title>Spotify{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
</svlete:head>

{#if user}
	<a href="#main-content" class="skip-link">Skip to content</a>
{/if}

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		{#if user}
			<div id="topbar" bind:this={topbar}>
				<div
					class="topbar-bg"
					style:background-color={$page.data.color?.color
						? $page.data.color?.color
						: 'var(--header-color)'}
					style:opacity={`${opacity}`}
				></div>
				<Header />
			</div>
		{/if}
		<main id="main-content" class:logged-in={user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		:global(html.no-js) & {
			@include breakpoint.down('md') {
				display: block;
			}
		}
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
				:global(html.no-js) & {
					height: auto;
					padding: 10px 20px;
					position: sticky;
					top: 0;
					background-color: var(--header-color);
					@include breakpoint.up('md') {
						position: fixed;
					}
				}
				.topbar-bg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					pointer-events: none;
					z-index: -1;
					background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0 0);
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(var(--header-height) + 30px);
					:global(html.no-js) & {
						@include breakpoint.down('md') {
							padding-top: 30px;
						}
					}
				}
			}
		}
	}
</style>
