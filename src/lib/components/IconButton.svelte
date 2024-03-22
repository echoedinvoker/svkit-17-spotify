<script lang="ts">
	import { type Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		icon: ComponentType<Icon>;
		label: string;
	}

	export let icon: ComponentType<Icon>;
	export let label: string;
	let button: HTMLButtonElement;

	export function getButton() {
		return button;
	}
</script>

<button bind:this={button} on:click on:keydown on:focus on:mouseover {...$$restProps} tabindex="0">
	<svelte:component this={icon} aria-hidden="true" focusable="false" color="var(--text-color)" />
	<span class="visually-hidden">{label}</span>
</button>

<style lang="scss">
	button {
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 25%;
		transition: all 0.2s ease-in-out;
		:global(svg) {
			vertical-align: middle;
		}
		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
		&:focus {
			box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
		}
		&:active {
			transform: scale(0.9);
		}
		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
</style>
