<script lang="ts">
	/**
	 * @fileoverview カスタムマウスカーソルを表示し、ホバー対象に応じて外観を変えるコンポーネント。
	 * カーソルは `Tween` によって滑らかに位置を追従し、特定の要素上では `pointer` スタイルになる。
	 */
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	/**
	 * マウスX座標のTweenアニメーション。
	 * @type {!Tween<number>}
	 * @const
	 */
	const x = new Tween(0, {
		duration: 300,
		easing: cubicOut
	});

	/**
	 * マウスY座標のTweenアニメーション。
	 * @type {!Tween<number>}
	 * @const
	 */
	const y = new Tween(0, {
		duration: 300,
		easing: cubicOut
	});

	/**
	 * 現在のカーソル位置がポインタスタイル（リンクなど）かどうかを示すフラグ。
	 * @type {boolean}
	 */
	let isPointer = false;

	onMount(() => {
		/**
		 * マウス移動時にカーソル位置を更新し、ポインタ要素上にあるかどうかを判定する。
		 *
		 * @param {!MouseEvent} event マウス移動イベント。
		 * @return {void}
		 */
		const handleMouseMove = (event: MouseEvent) => {
			x.target = event.clientX;
			y.target = event.clientY;

			const target = event.target as HTMLElement;
			isPointer = !!target.closest('a, button, [data-cursor-pointer]');
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<div
	class="cursor"
	class:pointer={isPointer}
	style="left: {x.current}px; top: {y.current}px;"
></div>

<style>
	:global(*),
	:global(*::before),
	:global(*::after) {
		cursor: none !important;
	}

	.cursor {
		position: fixed;
		display: none;
		width: 10px;
		height: 10px;
		background-color: #fafafa;
		mix-blend-mode: difference;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
		z-index: 9999;
		transition:
			background-color 0.3s,
			mix-blend-mode 0.3s;
	}

	.cursor.pointer {
		background-color: white;
		mix-blend-mode: difference;
	}

	@media (pointer: fine) {
		.cursor {
			display: block;
		}
	}
</style>
