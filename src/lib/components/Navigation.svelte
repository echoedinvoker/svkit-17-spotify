<script lang="ts">
	import { Home, Album, ListMusic, Search, Menu, X, type Icon } from 'lucide-svelte';
	import { tick, type ComponentType } from 'svelte';
	import Logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { IconButton } from '$components';

	export let desktop: boolean;
	let isMobileMenuOpen = false;
	let openMenuButton: IconButton;
	let closeMenuButton: IconButton;
	let lastFocusableElement: HTMLAnchorElement;

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
		},
		// about page
		{
			path: '/about',
			label: 'About',
			icon: Album
		}
	];

	async function openMenu() {
		isMobileMenuOpen = true;
		await tick();
		// closeMenuButton.focus();
		closeMenuButton.getButton().focus();
	}
	function closeMenu() {
		isMobileMenuOpen = false;
		// openMenuButton.focus();
		openMenuButton.getButton().focus();
	}

	function moveFocusToBottom(e: KeyboardEvent) {
		if (desktop) return;
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			lastFocusableElement.focus();
		}
	}
	function moveFocusToTop(e: KeyboardEvent) {
		if (desktop) return;
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			// closeMenuButton.focus();
			closeMenuButton.getButton().focus();
		}
	}

	function handleEscape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeMenu();
		}
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
			<IconButton
				icon={Menu}
				label="Open menu"
				on:click={openMenu}
				bind:this={openMenuButton}
				aria-expanded={isOpen}
				class="menu-button"
			/>
		{/if}
		<div
			class="nav-content-inner"
			class:is-hidden={!isOpen && !desktop}
			style:visibility={isOpen || desktop ? 'visible' : 'hidden'}
			on:keyup={handleEscape}
			role="button"
			tabindex="0"
		>
			{#if !desktop}
				<IconButton
					icon={X}
					label="Close menu"
					on:click={closeMenu}
					bind:this={closeMenuButton}
					on:keydown={moveFocusToBottom}
					class="close-menu-button"
				/>
			{/if}
			<img src={Logo} alt="Spotify Logo" class="logo" />
			<ul>
				{#each menuItems as menu, index}
					{@const iconProps = {
						focusable: 'true',
						'aria-hidden': true,
						color: 'var(--text-color)',
						size: 26,
						strokeWidth: 1.5
					}}
					<li class:active={menu.path === $page.url.pathname}>
						{#if menuItems.length === index + 1}
							<a href={menu.path} bind:this={lastFocusableElement} on:keydown={moveFocusToTop}>
								<svelte:component this={menu.icon} {...iconProps} />
								{menu.label}
							</a>
						{:else}
							<a href={menu.path}>
								<svelte:component this={menu.icon} {...iconProps} />
								{menu.label}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		:global(.menu-button) {
			@include breakpoint.up('md') {
				display: none;
			}
		}
		:global(.close-menu-button) {
			position: absolute;
			top: 20px;
			right: 20px;
		}
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
			:global(html.no-js) & {
				@include breakpoint.down('md') {
					display: block;
					height: auto;
				}
			}

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
