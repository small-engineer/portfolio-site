<script>
	/**
	 * @fileoverview `backgroundUrl` ストアの変更に応じて、背景画像をスムーズに切り替えるための Svelte コンポーネント。
	 * 前回と現在の背景画像を重ねて表示し、クロスフェード効果を実現する。
	 */

	import { backgroundUrl } from '$lib/stores';

	/**
	 * 前回表示されていた背景画像の URL。
	 * @type {string}
	 * @private
	 */
	let prevUrl = '';

	/**
	 * 現在表示中の背景画像の URL。
	 * @type {string}
	 * @private
	 */
	let currentUrl = '';

	/**
	 * 前回の背景画像レイヤーを表示するかどうかのフラグ。
	 * @type {boolean}
	 * @private
	 */
	let showPrev = false;

	/**
	 * 現在の背景画像レイヤーを表示するかどうかのフラグ。
	 * @type {boolean}
	 * @private
	 */
	let showCurrent = false;

	/**
	 * `backgroundUrl` ストアの値が更新された際に、背景画像を切り替える処理。
	 * 新しい画像が読み込まれると、`showCurrent` を `true` にして表示を切り替える。
	 */
	backgroundUrl.subscribe((newUrl) => {
		if (!newUrl || newUrl === currentUrl) return;

		prevUrl = currentUrl;
		showPrev = true;
		showCurrent = false;
		currentUrl = newUrl;

		const img = new Image();
		img.onload = () => {
			showCurrent = true;
			setTimeout(() => {
				showPrev = false;
			}, 600);
		};

		img.src = newUrl;
	});
</script>

<!-- 背景レイヤー（前の画像） -->
<div
	class="bg-layer"
	style="
		background-image: url({prevUrl});
		opacity: {showPrev ? 1 : 0};
		transition: opacity 0.3s, linear 0.3s;
	"
></div>

<!-- 背景レイヤー（現在の画像） -->
<div
	class="bg-layer"
	style="
		background-image: url({currentUrl});
		opacity: {showCurrent ? 1 : 0};
		transition: opacity 0.3s, linear 0.3s;
	"
></div>
<div class="frosted-glass"></div>

<style>
	/** 
	 * 背景画像レイヤー: 画面全体を覆い、スムーズなフェードを適用
	 */
	.bg-layer {
		position: fixed;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-attachment: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
	}

	/** 
	 * フロストガラス効果オーバーレイ
	 */
	.frosted-glass {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(186, 186, 201, 0.1);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 0;
	}
</style>
