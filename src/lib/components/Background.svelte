<script>
	import { backgroundUrl } from '$lib/stores';

	let prevUrl = '';
	let currentUrl = '';
	let showPrev = false;
	let showCurrent = false;

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
		position: absolute;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	/** 
	 * フロストガラス効果オーバーレイ
	 */
	.frosted-glass {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(186, 186, 201, 0.1);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
</style>
