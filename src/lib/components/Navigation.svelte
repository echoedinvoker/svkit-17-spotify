<script lang="ts">
	import { Home, ListMusic, Search, type Icon } from 'lucide-svelte';
	import { tick, type ComponentType } from 'svelte';
	import Logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';

	export let desktop: boolean;
	let isMobileMenuOpen = false;
	let openMenuButton: HTMLButtonElement;
	let closeMenuButton: HTMLButtonElement;

	$: isOpen = !desktop && isMobileMenuOpen;

	const menuItems: { path: string; label: string; icon: ComponentType<Icon> }[] = [
		{
			path: '/',
			label: 'Home',
			icon: Home
		},
		{
			path: '/search',
			label: 'Search',
			icon: Search
		},
		{
			path: '/playlists',
			label: 'Playlists',
			icon: ListMusic
		}
	];

	async function openMenu() {
		isMobileMenuOpen = true;
		await tick();
		closeMenuButton.focus();
	}
	function closeMenu() {
		isMobileMenuOpen = false;
		openMenuButton.focus();
	}

	beforeNavigate(() => (isMobileMenuOpen = false));
</script>

<svelte:head>
	{#if isOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="nav-content" class:desktop class:mobile={!desktop}>
	{#if isOpen}
		<div
			class="overlay"
			on:click={() => (isMobileMenuOpen = false)}
			transition:fade
			aria-hidden="true"
		></div>
	{/if}
	<nav aria-label="Main">
		{#if !desktop}
			<button on:click={openMenu} bind:this={openMenuButton} aria-expanded={isOpen}>Open</button>
		{/if}
		<div
			class="nav-content-inner"
			class:is-hidden={!isOpen}
			style:visibility={isOpen ? 'visible' : 'hidden'}
		>
			{#if !desktop}
				<button on:click={closeMenu} bind:this={closeMenuButton}>Close</button>
			{/if}
			<img src={Logo} alt="Spotify Logo" class="logo" />
			<ul>
				{#each menuItems as menu}
					<li class:active={menu.path === $page.url.pathname}>
						<a href={menu.path}>
							<svelte:component
								this={menu.icon}
								focusable="true"
								aria-hidden="true"
								color="var(--text-color)"
								size={26}
								strokeWidth={1.5}
							/>
							{menu.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: block;
				}
			}
		}
		&.mobile .nav-content-inner {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			@include breakpoint.down('md') {
				display: block;
			}
			transition:
				transform 0.2s ease-in-out,
				opacity 0.2s ease-in-out;
			&.is-hidden {
				transition:
					transform 0.2s ease-in-out,
					opacity 0.2s ease-in-out,
					visibility 0.2s;
				transform: translateX(-100%);
				opacity: 0;
			}
		}
		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--sidebar-color);
			z-index: 100;
			opacity: 0.75;
			@include breakpoint.up('md') {
				display: none;
			}
		}
		.nav-content-inner {
			padding: 20px;
			min-width: var(--sidebar-width);
			background-color: var(--sidebar-color);
			height: 100vh;
			overflow: auto;
			display: none;

			.logo {
				width: 130px;
				max-width: 100%;
			}
			ul {
				padding: 0;
				margin: 20px 0 0;
				list-style: none;
				li {
					&.active {
						a {
							opacity: 1;
						}
					}
					a {
						opacity: 0.6;
						display: flex;
						align-items: center;
						text-decoration: none;
						color: var(--text-color);
						font-size: functions.toRem(14);
						font-weight: 500;
						padding: 5px;
						margin: 3px 0;
						:global(svg) {
							margin-right: 10px;
						}
						transition: opacity 0.2s ease-in-out;
						&:hover,
						&focus {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
