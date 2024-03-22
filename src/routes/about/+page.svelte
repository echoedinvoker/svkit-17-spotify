<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>About</h1>
<p id="me">This is a page about me.</p>
<footer>
	<p>
		{JSON.stringify(data)}
	</p>
</footer>

<style lang="scss">
	h1 {
		color: red;
		font-size: 2em;
		font-weight: bold;
		margin: 0 0 1em 0;
		padding: 0;
	}
	p {
		color: blue;
	}
	footer {
		margin-top: 2em;
	}
</style>
