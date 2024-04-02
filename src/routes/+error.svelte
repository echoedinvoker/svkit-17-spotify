<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$components';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="content">
	<h1>{$page.error?.message}</h1>

	{#if $page.status === 404}
		<p>The page you are looking for does not exist.</p>
		<div class="buttons">
			<Button element="a" href="/">Home</Button>
			<Button element="a" href="/search">Search</Button>
		</div>
	{/if}
</div>
