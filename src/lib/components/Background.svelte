<script lang="ts">
	// 特にロジックは不要。必要に応じて動的パラメータなど追加可能。
</script>

<div class="background">
	<div class="animated-gradient"></div>
	<div class="frosted-glass"></div>
</div>

<style>
	/* 全画面に広がる背景 */
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1; /* コンテンツの背面に配置 */
		overflow: hidden;
	}

	/* 蠢くグラデーションアニメーション */
	.animated-gradient {
		position: absolute;
		width: 200%;
		height: 200%;
		background: linear-gradient(45deg, #ff6ec4, #7873f5, #4adede, #48c6ef);
		background-size: 200% 200%;
		animation: gradientAnimation 20s ease infinite;
	}

	@keyframes gradientAnimation {
		0% {
			transform: translate(0%, 0%);
		}
		50% {
			transform: translate(-50%, -50%);
		}
		100% {
			transform: translate(0%, 0%);
		}
	}

	/* 曇りガラス効果 */
	.frosted-glass {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
	}

	@keyframes slimeMove {
		0% {
			top: 20%;
			left: 10%;
			transform: scale(1);
		}
		50% {
			top: 50%;
			left: 70%;
			transform: scale(1.2);
		}
		100% {
			top: 20%;
			left: 10%;
			transform: scale(1);
		}
	}
</style>
