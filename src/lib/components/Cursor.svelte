<script>
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// マウス座標用に Tween を2つ作成（x軸, y軸）
	const x = new Tween(0, { duration: 300, easing: cubicOut });
	const y = new Tween(0, { duration: 300, easing: cubicOut });

	onMount(() => {
		const handleMouseMove = (event) => {
			// マウス座標を Tween のターゲットに設定
			x.target = event.clientX;
			y.target = event.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<!-- Tween の current 値はリアクティブに更新されるので、$x, $y として利用できる -->
<div class="cursor" style="left: {$x}px; top: {$y}px;"></div>

<style>
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		/* 要素自体のサイズ */
		width: 20px;
		height: 20px;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		pointer-events: none;
		/* マウスの中央に表示するためのオフセット */
		transform: translate(-50%, -50%);
		z-index: 9999;
	}
</style>
