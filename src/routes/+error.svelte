<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, LogoutButton } from '$components';

	async function handleRetry() {
		await invalidate(`app:${$page.route.id}`);
	}
</script>

<!-- <svelte:head> -->
<!-- 	<title>{$page.status}</title> -->
<!-- </svelte:head> -->

<div class="content">
	<h1>{$page.error?.message}</h1>

	{#if $page.status === 404}
		<p>The page you are looking for does not exist.</p>
		<div class="buttons">
			<Button element="a" href="/">Home</Button>
			<Button element="a" href="/search">Search</Button>
		</div>
	{/if}

	{#if $page.status === 401}
		<p>You are not authorized to view this page. Please log in.</p>
		<div class="buttons">
			<LogoutButton />
		</div>
	{/if}

	{#if ![401, 404].includes($page.status)}
		<Button element="button" on:click={handleRetry}>Retry</Button>
	{/if}
</div>

<style lang="scss">
	.content {
		text-align: center;
	}
	h1 {
		font-size: functions.toRem(40);
	}
	p {
		font-size: functions.toRem(20);
	}
	.buttons {
		margin-top: 40px;
		:global(a) {
			margin: 0 5px;
		}
	}
</style>
