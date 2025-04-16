<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';

	/** @type {number} 現在のfaviconのインデックス */
	let faviconIndex = 0;

	/** @type {string[]} 使用するfaviconのリスト */
	const favicons = [
		'/fav1.ico',
		'/fav2.ico',
		'/fav3.ico',
		'/fav4.ico',
		'/fav5.ico',
		'/fav6.ico',
		'/fav7.ico',
		'/fav8.ico',
		'/fav9.ico',
		'/fav10.ico',
		'/fav11.ico',
		'/fav12.ico',
		'/fav13.ico',
		'/fav14.ico',
		'/fav15.ico',
		'/fav16.ico',
		'/fav17.ico',
		'/fav18.ico'
	];

	let encFavicons: string[] = [];
	let interval: ReturnType<typeof setInterval>;

	async function updateFavicon() {
		if (encFavicons.length === 0) return;
		const doc = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
		if (!doc) return;
		doc.href = encFavicons[faviconIndex];
		faviconIndex = (faviconIndex + 1) % encFavicons.length;
	}
	

	onMount(async () => {
		encFavicons = await Promise.all(
			favicons.map(async (path) => {
				const res = await fetch(path);
				const blob = await res.blob();
				return URL.createObjectURL(blob);
			})
		);
		interval = setInterval(updateFavicon, 100);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	/** @type {any} 子要素 */
	export let children;
</script>

{@render children()}
