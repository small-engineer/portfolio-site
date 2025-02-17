<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// マウス座標用に Tween インスタンスを生成
	const x = new Tween(0, { duration: 300, easing: cubicOut });
	const y = new Tween(0, { duration: 300, easing: cubicOut });
	
	// インタラクティブな要素上にあるかどうかのフラグ
	let isPointer = false;

	onMount(() => {
		const handleMouseMove = (event: MouseEvent) => {
			// マウスの位置を更新
			x.target = event.clientX;
			y.target = event.clientY;
			
			// マウスが指のアイコンになるべき対象かどうかを判定
			const target = event.target as HTMLElement;
			isPointer = !!target.closest('a, button, [data-cursor-pointer]');
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<style>
	/* 全要素でデフォルトのカーソルを非表示にする */
	:global(*),
	:global(*::before),
	:global(*::after) {
		cursor: none !important;
	}

	.cursor {
		position: fixed;
		width: 10px;
		height: 10px;
		background-color: #fafafa;
		mix-blend-mode: difference;
		border-radius: 50%;
		pointer-events: none; /* カスタムカーソルがクリック等の妨げにならないように */
		transform: translate(-50%, -50%);
		z-index: 9999;
		transition: background-color 0.3s, mix-blend-mode 0.3s;
	}

	/* インタラクティブな対象上では色反転させる */
	.cursor.pointer {
		background-color: white;
		mix-blend-mode: difference;
	}
</style>

<!--
  Tween クラスは Svelte のストアではないため、$記法は使えません。
  クラスバインディング class:pointer={isPointer} により、状態に応じたスタイルに切り替えています。
-->
<div
	class="cursor"
	class:pointer={isPointer}
	style="left: {x.current}px; top: {y.current}px;"
></div>
