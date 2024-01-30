<script lang="ts">
	import { Button } from '$components';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import cover from '$assets/cover.png';
</script>

<div class="wrapper">
	<div class="content">
		<img src={logo} alt="Spotify" class="logo" />
		<h1>EGP 0.00 for 3 months of Premium</h1>
		<p>Enjoy ad-free music, offline listening, and more. Cancel anytime.</p>
		<div class="btns">
			<Button
				element="a"
				variant="outline"
				href="https://www.spotify.com/"
				target="_blank"
				rel="noopener noreferrer">Sign up</Button
			>
			<Button element="a" href="/api/auth/login">Login</Button>
		</div>
	</div>
	<div class="cover">
		<img src={cover} alt="Svelte album cover" />
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(230deg, var(--sidebar-color), var(--bg-color));
		height: 100vh;
	}
	.wrapper {
		display: flex;
		width: 100%;
		max-width: 1200px;
		margin: 80px auto 0;
		align-items: center;
		flex-direction: column;
		@include breakpoint.up('md') {
			flex-direction: row;
		}
	}
	.content {
		flex: 1.8;
		.logo {
			width: 170px;
			max-width: 100%;
			margin-bottom: functions.toRem(30);
		}
		h1 {
			font-size: functions.toRem(40);
		}
		p {
			font-size: functions.toRem(20);
			margin-bottom: functions.toRem(40);
		}
		.btns {
			display: flex;
			gap: functions.toRem(15);
			margin-bottom: functions.toRem(40);
			:global(.btn) {
				padding: 10px 20px;
				text-transform: uppercase;
			}
		}
	}
	.cover {
		flex: 1;
		img {
			max-width: 100%;
		}
		@include breakpoint.up('md') {
			margin-left: functions.toRem(40);
		}
	}
</style>
