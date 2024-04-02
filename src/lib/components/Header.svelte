<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { LogoutButton, Navigation } from '$components';
	import Playing from '$assets/playing.gif';
	import { ChevronDown, ExternalLink } from 'lucide-svelte';
	import { tippy } from '$actions';

	$: user = $page.data.user;
</script>

<div class="content">
	<div class="left">
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div class="right">
		<div id="profile-button">
			<button
				class="profile-button"
				use:tippy={{
					content: document.getElementById('profile-menu') || undefined,
					onMount: () => {
						const template = document.getElementById('profile-menu');
						if (template) {
							template.style.display = 'block';
						}
					},
					trigger: 'click',
					interactive: true,
					placement: 'bottom-end',
					theme: 'menu',
					hideOnPopperBlur: false
				}}
			>
				{#if user?.images && user.images.length > 0}
					<img src={user.images[0].url} alt="" />
				{:else}
					<img src={Playing} alt="" />
				{/if}
				{user?.display_name} <span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" size={22} />
			</button>
		</div>
		<div id="profile-menu" style="display: none;">
			<div class="profile-menu-content">
				<ul>
					<li>
						<a href={user?.external_urls.spotify} target="_blank" rel="noopener noreferrer">
							View on Spotify
							<ExternalLink focusable="false" aria-hidden size={20} />
						</a>
					</li>
					<li>
						<a href="/profile">View Profile</a>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		:global(html.no-js) & {
			justify-content: flex-start;
		}
	}
	.profile-button {
		background: none;
		border: 1px solid var(--border);
		padding: 5px;
		border-radius: 25px;
		display: flex;
		:global(html.no-js) & {
			display: none;
		}
		align-items: center;
		color: var(--text-color);
		cursor: pointer;
		img {
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
		}
		:global(.profile-arrow) {
			margin-left: 3px;
		}
		&:hover {
			background-color: var(--accent-color);
		}
	}
	.profile-menu-content {
		ul {
			padding: 0;
			margin: 0;
			list-style: none;
			li {
				&:hover {
					background-image: linear-gradient(rgba(255, 255, 255, 0.07) 0 0);
				}
				a :global(svg) {
					margin-left: 2px;
					vertical-align: middle;
				}
				a,
				:global(button) {
					display: inline-block;
					padding: 10px 15px;
					text-decoration: none;
					border: none;
					background: none;
					color: var(--menu-text-color);
					cursor: pointer;
					width: 100%;
					text-align: left;
					font-size: functions.toRem(14);
					border-radius: 0;
					font-weight: 400;
				}
			}
		}
	}
	:global(html.no-js) #profile-menu {
		display: block !important;
		.profile-menu-content {
			ul {
				li {
					display: inline-block;
				}
			}
		}
	}
</style>
