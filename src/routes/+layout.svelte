<script>
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';

	/** @type {number} 現在のfaviconのインデックス */
	let faviconIndex = 0;

	/** @type {string[]} 使用するfaviconのリスト */
	const favicons = [
		'/fav1.ico', '/fav2.ico', '/fav3.ico', '/fav4.ico',
		'/fav5.ico', '/fav6.ico', '/fav7.ico', '/fav8.ico',
		'/fav9.ico', '/fav10.ico', '/fav11.ico', '/fav12.ico',
		'/fav13.ico', '/fav14.ico', '/fav15.ico', '/fav16.ico',
		'/fav17.ico', '/fav18.ico',
	];

	/** @type {ReturnType<typeof setInterval>} setIntervalのID */
	let interval;

	/**
	 * Faviconを次のものに更新する
	 */
	function updateFavicon() {
		const oldLink = document.querySelector("link[rel~='icon']");
		if (oldLink) {
			document.head.removeChild(oldLink);
		}

		const newLink = document.createElement('link');
		newLink.rel = 'icon';
		newLink.href = favicons[faviconIndex];
		document.head.appendChild(newLink);

		faviconIndex = (faviconIndex + 1) % favicons.length;
	}

	onMount(() => {
		updateFavicon();
		interval = setInterval(updateFavicon, 2);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	/** @type {any} 子要素 */
	export let children;
</script>

{@render children()}
