<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Element = $$Generic<'button' | 'a'>;

	interface ButtonComponentElements {
		button: HTMLButtonAttributes;
		a: HTMLAnchorAttributes;
	}

	type $$Props = ButtonComponentElements[Element] & {
		element: Element;
		variant?: 'solid' | 'outline' | 'danger';
		className?: string;
	};

	export let element: Element;
	export let variant: 'solid' | 'outline' | 'danger' = 'solid';
	export let className: string = '';
</script>

<svelte:element
	this={element}
	class="btn btn-{variant} {className}"
	{...$$restProps}
	on:click
	role="button"
	tabindex="0"
>
	<slot />
</svelte:element>

<style lang="scss">
	.btn {
		display: inline-block;
		border: none;
		font-weight: 600;
		font-size: functions.toRem(14);
		border-radius: 20px;
		cursor: pointer;
		padding: 7px 15px;
		text-decoration: none;
		&.btn-solid {
			background-color: var(--accent-color);
			color: #000;
			border: 2px solid var(--accent-color);
		}
		&.btn-outline {
			background: none;
			color: var(--text-color);
			border: 2px solid;
		}
		&.btn-danger {
			background-color: var(--error);
			color: #fff;
			border: 2px solid var(--error);
		}
		&:disabled {
			cursor: not-allowed;
			opacity: 0.7;
		}
		&:hover {
			&.btn-solid,
			&.btn-danger {
				background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
			}
			&.btn-outline {
				background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
			}
		}
		&:active {
			transform: scale(0.98);
		}
	}
</style>
