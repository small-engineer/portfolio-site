<script lang="ts">
	/**
	 * @fileoverview Faviconをアニメーション的に切り替えるSvelteコンポーネント。
	 * favicon画像を順に切り替えることで、動くアイコンのような視覚効果を演出。
	 */

	import '../app.css';
	import { onMount, onDestroy } from 'svelte';

	/**
	 * 現在の favicon のインデックス。
	 * @type {number}
	 * @private
	 */
	let faviconIndex = 0;

	/**
	 * 使用する favicon パスのリスト。
	 * @type {!Array<string>}
	 * @const
	 */
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

	/**
	 * Blob URL に変換された favicon のリスト。
	 * @type {!Array<string>}
	 * @private
	 */
	let encFavicons: string[] = [];

	/**
	 * Favicon更新用のinterval ID。
	 * @type {?ReturnType<typeof setInterval>}
	 * @private
	 */
	let interval: ReturnType<typeof setInterval>;

	/**
	 * Faviconを次の画像に更新する。
	 *
	 * @return {void}
	 * @private
	 */
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

	/**
	 * このコンポーネント内で描画される任意の子要素。
	 * @type {*}
	 * @export
	 */
	export let children;
</script>

{@render children()}
